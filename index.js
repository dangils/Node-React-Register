const express = require('express')
const {User} = require("./models/User")
const app = express()
const port = 5000
const bodyParser = require('body-parser')
// post로 요청된 body를 쉽게 추출할 수 있는 모듈이다. (post 요청 데이터 추출)
// 추출된 결과는 body 속성으로 저장된다.

const config = require('./config/key')

//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게함
app.use(bodyParser.urlencoded({extended: true}))

// parse application/json 형식으로 받음
app.use(bodyParser.json())
//app.use 하나의 미들웨어를 애플리케이션에 바인딩(연결) 하는것
//app.get express 에서 사용 하는 경로 의 일부분 으로 특정한 요청 과 일치 하고 처리 하 며 요청 방법



/*
    설정 결과 : 클라이언트 측에서 { name: jinhyeok, job: ios-developer } 와 같은
    json 형식의 바디를 보내면 서버 측에서 req.body 혹은 req.body.name, req.body.job
    등으로 해당 데이터에 곧바로 접근할 수 있게 됐다.
*/

// parse application/x-www-form-urlencoded


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(()=>console.log('MongoDB Connected...'))

// 몽구스 버전 6.0 이하 적용방식
/*
    mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log('MongoDB Connected..')
    }).catch( err => console.log(err))
*/

// 몽구스 버전 6.0 이상 적용 방식 
// 옵션값이 이미 적용되어 있기에 에러가 발생 따라서 옵션들을 제거해주었다.


app.get('/', (req, res) => {
  res.send('Hello World2222!')
})

app.post('/register', (req,res) =>{  //회원 가입을 위한 라우터

    //회원 가입 할때 필요한 정보들을 client에서 가져온후 , DB에 넣어준다

    const user = new User(req.body) //인스턴스 생성
    //body-parser로 클라이언트 정보를 req.body로 전달받음

    //정보들의 user 모델에 저장됨
    user.save((err, userInfo) =>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({ // userInfo 가 잇으면 succes
            success:true
        })
    })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



