//Store의 reducer들 (state가 변한 값을 리턴해주는것) ex) User Reducer, Post Reducer...
//각각의 reducer를 combineRecuders를 이용해 하나로 합쳐줌 rootReducer

import { combineReducers } from 'redux';

import user from './user_reducer'

const rootReducer = combineReducers({
    user
})

export default rootReducer;