const mongoose = require('mongoose') // 몽구스 모듈을 가져옴
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength:50,
    },
    email:{
        type: String,
        trim: true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

//'save' 하기 전에(pre) 함수 수행 후, 파라미터를 next를 넣어 다음 메서드 수행
userSchema.pre('save',function( next ){
    let user = this //현재 입력받은 userSchema 값

                                    //isModified : isModified (변경여부 확인하는 몽구스 내장 메서드)
    if(user.isModified('password')){ //user의 passowrd가 변경이 있을때만 아래 암호화 매서드 수행

        //비밀 번호를 암호화
            // genSalt()를 사용해 salt값 생성
            // salt : 공격자가 암호를 유추할 수 없도록, 평문 데이터에 의미 없는 데이터를
            // 뿌려 넣는데 이것을 salt라고 한다.            // salt 값 생성
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(user.password , salt , function(err,hash){
                if(err) return next(err) //실패시 err로 리턴
                user.password = hash //hash생성이 되면 현재 입력된 plain password를 hash된 비밀 번호로 교체
                next()
            })
        })
    } else { // password 이외 사항이 변경 될때는 next()
        next() 
    }
}, {})
/*
몽구스 Schema.methods에서는 this가 호출한애를 가리킵니다

예를들어 asdf.findByToken 이렇게 호출했다면

this= asdf가 되구요

statics는 this가 모델 그 자체를 가리킵니다

즉 statics에서 this는 mongoose 모델을 가리킵니다

findByToken에서 statics으로 해야 하는 이유는

findOne은 mongoose 모델에서 작동하는 함수이기 때문입니다
*/
// userSchema에 작동하는 메서드 생성
/*
주의할점: this를 통해 해당 메서드를 불러온 객체의 값을 이용해야 하는데 화살표 함수를
사용하게 되면 lexical this를 사용하게 되어 해당 메서드를 이용하는데 불편하게 된다.

이유 ?
화살표 함수는 function의 키워드의 줄임말로 흔히 언급된다.
하지만 완전히 다른 점으로는 this가 지칭하는 동적 스코프 규칙을 폐기하고, 
자신과 가장 가까운 함수의 스코프에서 this 값을 받아온다.
*/




//schema.methods (인스턴스 메서드)
// 로그인 시 비밀번호 암호화 -> 디비에 저장된 비밀번호와 비교
userSchema.methods.comparePassword = function(plainPassword ,cb){

    //plainPassword 123457, 암호화된 비밀번호 $2b$10$lH27RcJf/vDlq2X3fVUPO.nAP3./Z29KTC1JW9yjkoMwIDgT6FphW
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch) //compare 했을때 일치하면 isMatch(true)를 반환
    })
}

userSchema.methods.generateToken = function(cb){

    let user = this; // 현재 user의 데이터

    let token = jwt.sign(user._id.toHexString(), 'secretToken');;

    /*
    user._id + 'secretToken' = token // 두개를 합쳐서 토큰을 생성
    이 후 secretToken으로 user._id 확인이 가능
    */

    user.token = token // 생성된 token을 넣음
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user) //에러가 없다면 user정보만 전달

    })
}


// jwt.verify() 함수에 들어가는 매개변수 3개

// token: client에게서 받은 token
// secretkey : token 생성 시 사용했던 secretKey
// 3번째 인자로 들어간 익명함수 : 유효성 검사 결과를 처리할 callback 함수
userSchema.statics.findByToken = function( token, cb){
    //토큰을 가져온 후 복호화 decode
    let user = this;

    jwt.verify(token, 'secretToken', function(err,decoded){
        //decoded -> 복호화된 토큰
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}

const User = mongoose.model('User',userSchema)

module.exports = { User } // 외부에서 User를 참고 가능하도록 exports