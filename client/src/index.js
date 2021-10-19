import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'  //Provider로 감싸며 내부 데이터 리덕스로 연결
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { applyMiddleware ,createStore } from 'redux'; // 리덕스에서 받은 미들웨어 사용
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers' // _reducers 폴더 안의 index.js를 자동으로 처리해줌

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
                                              //좌측 미들웨어와 함께 생성하기 위해 createStore를 받아옴

ReactDOM.render( 
  <Provider
    store={createStoreWithMiddleware(Reducer,
        window._REDUX_DEVTOOLS_EXTENSION_&&
        window._REDUX_DEVTOOLS_EXTENSION_()
      )}
  > 
    <App/>
  </Provider>,
  document.getElementById('root')

);


// // Redux Devtools를 사용하는 이유
// /*
//   1. 중복 렌더링 방지
//   2. 효율적으로 State값 관리
//   3. 아름다운 Redux 코드 작성 가능
// */