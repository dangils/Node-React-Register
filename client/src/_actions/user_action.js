import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'; //types에서 login_user를 가져옴

export function loginUser(dataTosubmit){

   const request =  axios.post('/api/users/login',dataTosubmit)
   //서버에 req를 요청 후, 반환 받은 response를 request에 저장
    .then(response => response.data )

    return {
        //변경된 값을 reducer로 보냄
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit){
    const request =  axios.post('/api/users/register',dataTosubmit)
    //서버에 req를 요청 후, 반환 받은 response를 request에 저장
     .then(response => response.data )
 
     return {
         //변경된 값을 reducer로 보냄
         type: REGISTER_USER,
         payload: request
     }
 }

 export function auth(){
    const request =  axios.get('/api/users/auth')
    //서버에 req를 요청 후, 반환 받은 response를 request에 저장
     .then(response => response.data )
 
     return {
         //변경된 값을 reducer로 보냄
         type: AUTH_USER,
         payload: request
     }
 }