import{
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'


export default function(state ={}, action){
                    //이전 state와 현재state(action)
    //타입이 다를때 마다 다른 조치를 취해주기 위해 switch 문법 적용
    switch (action.type){
        case LOGIN_USER:
            return{...state , loginSuccess : action.payload} 
            //user_action에서 반환된 payload(request 반환값) 을 data에 넣음
            //빈 상태를 가져옴
        break;
        case REGISTER_USER:
            return {...state, register:action.payload}
        break;
        case AUTH_USER:
            return {...state, userData:action.payload}
            //모든 유저의 정보들이 담김
        break;
        default:
            return state;
    }
}