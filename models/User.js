const mongoose = require('mongoose') // 몽구스 모듈을 가져옴

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

const User = mongoose.model('User',userSchema)

module.exports = { User } // 외부에서 User를 참고 가능하도록 exports