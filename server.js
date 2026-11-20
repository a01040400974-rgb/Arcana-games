const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer, WebSocket } = require('ws');
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
  if (pathname !== '/' && pathname !== '/index.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Not found');
  }
  fs.readFile(path.join(ROOT, 'index.html'), (err, data) => {
    if (err) { res.writeHead(500); return res.end('Game file unavailable'); }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});
const wss = new WebSocketServer({ server });
const players = new Map();
function sendWorld() {
  const packet = JSON.stringify({ type: 'world', players: [...players.values()] });
  for (const client of wss.clients) if (client.readyState === WebSocket.OPEN) client.send(packet);
}
wss.on('connection', ws => {
  const id = Math.random().toString(36).slice(2, 10);
  players.set(id, { id, name: '모험가', x: 0, y: 0, level: 1, job: '모험가' });
  ws.send(JSON.stringify({ type: 'welcome', id, players: [...players.values()] }));
  ws.on('message', raw => {
    if (raw.length > 8192) return;
    let msg; try { msg = JSON.parse(raw.toString()); } catch { return; }
    if (msg.type === 'state' && players.has(id)) {
      const p = players.get(id);
      p.name = String(msg.name || '모험가').slice(0, 18);
      p.x = Number.isFinite(Number(msg.x)) ? Number(msg.x) : p.x;
      p.y = Number.isFinite(Number(msg.y)) ? Number(msg.y) : p.y;
      p.level = Number.isFinite(Number(msg.level)) ? Math.max(1, Math.min(9999, Number(msg.level))) : p.level;
      p.job = String(msg.job || '모험가').slice(0, 24);
      sendWorld();
    }
  });
  ws.on('close', () => { players.delete(id); sendWorld(); });
});
server.listen(PORT, '0.0.0.0', () => console.log(`Arcana online listening on ${PORT}`));
