﻿# Node-React-Register   
### Node, React-redux를 활용한 로그인,회원가입, 사용자 인증/접근제어

#### 실행방법
1. client/server 모듈 설치 
```
yarn init
yarn install
```
2. 서버 실행
```swift
yarn run backend
```
3. 클라이언트 실행
```swift
cd client
yarn start
```    

----------------------  

#### Redux와 사용자 Authentication 을 위한 폴더 구조  

_actions  
_reducers     →  Redux를 위한 폴더  

components/view/  → 랜더링 페이지  

components/view/Sections  → 해당 페이지에 관련된 components 관리 

App.js → Routing 관련 일을 처리

Config.js → 환경 변수 설정

hoc/auth → Higher Order Component의 약자로 사용자 인증을 위한 redux를 이곳에서 수행     



------------------------------   

### 리덕스란?
자바스크립트 상태관리 라이브러리
리덕스에는.. Props / State

컴퍼넌트간에 참조시 props를 이용, 부모 컴퍼넌트에서 자식 컴퍼넌트로 가능
(자식컴퍼넌트로 데이터는 내려줌)

State : 컴퍼넌트 내부에서 데이터가 변하는 경우

#### Redux 데이터 Flow

![image](https://user-images.githubusercontent.com/74512114/137848415-c3f8b1f6-85e4-45d2-bc71-864de135a50b.png)  

React Component에서 dispatch(action)을 하면 action -> reducer -> store로 각각 이동한 후 다시 react componet로
한 방향으로만 흐름

Action 
- 객체형식으로 어떤 액션이 일어났는지 체크, 액션이 일어난 상태

Reducer
- 액션을 수행함으로 써 변화된 값을 설명, 액션 오브젝트를 받은 후 변화된 값을 설명
이전 State과 action object를 받은 후에 next state를 return 한다
(previousState, action) => nextState

Store
- 자체 application의 state를 감싸주는 역할, 모든 state를 관리 , 메서드를 이용해 state를 관리  

setting up Redux
1. redux 2. react-redux 3.redux-promise 4.redux-thunk (리덕스 미들웨어)  


redux-promise ,redux-thunk (미들웨어)
store안의 state을 변경하려면 dispatch(action)을 이용해서만 변경가능, 이때 리덕스는 객체 형식의 action만 받을 수 있음, 때문에 function이나 promise 형태가 전달되면 해당 미들웨어를 사용해 actio에 전달 해야함  
- redux-thunk : 리덕스 사용시 function 형태가 action에 전달 될 때 사용됨  
- redux-promise : promise 형태가 action에 전달 될 때 사용됨





