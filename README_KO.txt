아르카나 온라인 v94 배포 안내

포함 파일
- index.html : 게임 화면
- server.js : 게임 웹사이트와 기본 WebSocket 공용 월드 서버
- package.json : 서버 실행 설정
- render.yaml : Render 배포 설정

가장 쉬운 배포 방법 (Render)
1. GitHub 저장소 arcana-game을 연다.
2. Add file > Upload files로 ZIP을 올리는 게 아니라, 이 ZIP을 기기에서 압축 해제한 뒤 안의 파일들을 저장소 최상위에 업로드한다.
3. Commit changes를 눌러 저장한다.
4. Render에서 New > Blueprint 또는 저장소 연결을 선택해 이 저장소를 연결한다.
5. Render가 render.yaml을 읽고 웹 서비스를 배포하면 생성된 https://...onrender.com 주소를 친구에게 공유한다.

중요
- ZIP 자체를 GitHub 저장소에 올리는 것만으로는 배포되지 않는다. 압축을 푼 파일들을 올려야 한다.
- 무료 호스팅은 잠시 쉬었다가 다시 켜질 수 있다.
- 이 프로토타입은 플레이어 이름/위치/레벨/직업 표시를 동기화한다. 몬스터, 전투, 드롭, 저장 데이터의 완전한 서버 동기화는 아직 구현되지 않았다.
- 비밀번호, 토큰, 비밀키는 저장소에 올리지 않는다.
