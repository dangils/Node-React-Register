

const express = require('express')
const {User} = require("./models/User")
const {auth} = require("./middleware/auth")
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
  
// post로 요청된 body를 쉽게 추출할 수 있는 모듈이다. (post 요청 데이터 추출)
// 추출된 결과는 body 속성으로 저장된다.

const config = require('./config/key')

//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게함
app.use(bodyParser.urlencoded({extended: true}))

// parse application/json 형식으로 받음
app.use(bodyParser.json())
app.use(cookieParser()) // cookieParser 적용

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

app.get('/api/hello', (req,res) =>{
    //client에서 지정한 end 포인트를 전달 받은 후 그 end 포인트에 send() 반환
    res.send("안녕하세요 ~ ")
})


//회원 가입을 위한 라우터
app.post('/api/users/register', (req,res) =>{  

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


//로그인 라우터
app.post('/api/users/login', (req,res) =>{ 
    //요청된 이메일을 데이터베이스에서 있는지 찾는다
    User.findOne({ email: req.body.email}, (err,user) =>{
        if(!user){ //user 정보가 없다면
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다"
            })
        }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인

    user.comparePassword(req.body.password, (err,isMatch) =>{
        //req.body로 로그인시 입력한 비밀번호를 가져옴, 콜백함수를 만들어 isMatch로 DB의 비밀번호와 비교

            if(!isMatch) //isMatch가 false 값이면
                return res.json({loginSuccess : false, message: "비밀번호가 틀렸습니다"})

            //비밀번호 까지 맞다면 토큰 생성
            user.generateToken((err,user) => { // 토큰이 들어있는 user를 받아옴
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 쿠키or 로컬스토리지에
                res.cookie("x_auth", user.token) //x_auth에 쿠키저장
                .status(200)
                .json({loginSuccess:true, userId:user._id})
                
            })
        })
    })
})


//auth 라우터 : 토큰 복호화로 사용자 로그인 여부 확인

//가운데 auth 미들웨어 추가, 콜벡 함수가 진행하기 전 auth 수행
// 미들웨어 auth에서 req.token, req.user로 반환받아 이곳에서 다시 사용
app.get('/api/users/auth', auth, (req,res) =>{
    //미들웨어 auth를 통과하여 이곳에 들어오면 Authentication 은 True

    res.status(200).json({
        //auth에서 req에 user를 반환 했기때문에 이곳에서 사용 가능
        _id:req.user._id,
        isAdmin: req.user.role ===0 ? false : true,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })
})


//로그아웃 라우터
app.get('/api/users/logout',auth,(req,res)=>{

    //user를 찾아서 업데이트
    User.findOneAndUpdate({_id:req.user._id},//auth 미들웨어에서 넣어진(req) 값으로 찾음
        {token:""} //토큰을 지움
        ,(err,user) =>{
            if(err) return res.json({ success:false,err});
            return res.status(200).send({
                success:true
            })
        }) 
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



