# Node-React-Register

config 폴더의 dev.js에 mongodb 코드 저장

config의 mongoURI은 key.js에서 분기처리하여 관리한다
이때,
Local 환경에서 개발시 (devlopment) mongoURI은 dev.js
Deploy(배포)한 후 개발시 (product) mongoURI은 prod.js (Heroku 사용시)