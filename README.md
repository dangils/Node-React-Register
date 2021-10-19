# Node-React-Register

config 폴더의 dev.js에 mongodb 코드 저장

config의 mongoURI은 key.js에서 분기처리하여 관리한다
이때,
Local 환경에서 개발시 (devlopment) mongoURI은 dev.js
Deploy(배포)한 후 개발시 (product) mongoURI은 prod.js (Heroku 사용시)


가입시 bcrypt로 비밀번호 암호화



Authentication 사용자 인증 flow ( auth.js 에서 수행)

1.Cookie에서 저장된 Token을 Server에서 가져와서 복호화
2.복호화를 하면 User ID가 반환되고, 그 User ID를 이용해서 DB 컬렉션에서 유저를 조회,
쿠키에서 받아온 토큰을 유저가 가진 토큰과 비교
토큰이 불일치 -> Authentication False




