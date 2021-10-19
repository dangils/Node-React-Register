# Node-React-Register   
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

## 1. JWT란 ?
일반 토큰 기반의 인증과 클레임(Claim) 토큰 기반 인증<br>
일반 토큰 기반은 과거에 많이 사용하던 방식이다.<br>
주로 의미가 없는 문자열 기반으로 구성되어 있으며 아래와 같이 표현이 된다.<br>

> a9ace025c90c0da2161075da6ddd3492a2fca776

그리고 사용할 때는 아래와 같은 json으로 보내는 방식으로 사용하게 됩니다.
```swift
{
  "code": 0,
  "msg": null,
  "response": {
      "token": "a9ace025c90c0da2161075da6ddd3492a2fca776",
      "now": 1212445869,
      "expired_at": 151244524
  }
}
```
그런데 이런 일반 토큰은 단순한 문자열이기 때문에 정보를 담거나 할 수 없다. 크게 보자면 아래와 같은 문제점을 가지고 있다. <br>

- 발급된 토큰에 대해서 만료를 시킬 수단이 없다.
- 발급된 토큰을 검사하거나 처리할 때마다 DB에 접근하여 검사할 경우 부담이 생긴다.
- 사용자 로그아웃 등으로 인한 토큰을 관리할 수 있는 방법이 없다.

이와 같은 문제를 어느정도 해결할 수 있는 것이 **클레임(Claim) 기반 토큰 방식**이다.

클레임(Claim)이란 사용자 정보나 데이터 속성 등을 의미한다.<br>
그래서 클레임 토큰이라 하면 토큰 안에 저런 정보를 담고 있는 토큰이라 생각하면 된다.<br>
예를 들면 아래와 같이 정보를 담고 있는 것을 클레임 기반이라고 할 수 있다.<br>
```swift
{
  "id": "redmax",
  "role": ["admin", "hr"],
  "company": "hexlant"
}
```
이런 클레임을 기반한 토큰 중 가장 대표적인 것이 바로 JWT다. <br>
JWT(Json Web Token)은 위에서 이야기 한 클레임 기반 토큰이며, 이름에서 알 수 있는 것처럼 JSON을 이용한 토큰이고 웹표준을 구현한 것이다. <br>
JWT는 헤더(header), 페이로드(payload), 서명(signature) 세 가지로 나눠져 있으며, 아래와 같은 형태로 구성되어 있다.<br>

```swift
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
      eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
            SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```            

각 구분은  .구분자로 나눠 표현되며, 각 값은 BASE64로 인코딩 되어 있다.

<hr>

## Base64 인코딩이란 ?<br>
인코딩은 정보의 형태나 형식을 표준화, 보안, 처리 속도 향상, 저장 공간 절약 등을 위해서 다른 형태나 형식으로 변환하는 처리 혹은 그 처리 방식을 말한다.<br>

Base64란 Binary Data를 Text로 바꾸는 엔코딩의 하나로써 Binary Data를 Chracter set에 영향을 받지 않는 공통 ASCII 영역의 문자로만 이루어진 <br>
문자열로 바꾸는 Encoding이다. Base64를 글자 그대로 직역하면 64진법이라는 뜻이다. 64진법은 컴퓨터한테 특별한데 그 이유는 64가 2의 제곱수 <br>
64=2^6이며 2의 제곱수에 기반한 진법 중 화면에 표시되는 ASCII 문자들로 표시할 수 있는 가장 큰 진법이기 때문이다. <br>
**핵심은 Base64 Encoding은 Binary Data를 Text로 변경하는 Encoding이다.**<br>

### 기본적인 원리
> 문자열 -> ASCII binary -> 6bit cut -> base64_encode <br>
> 모든 문자열이 3개씩 남김없이 끊어지진 않는다. 그래서 padding(불필요하게 넣는 군더더기)을 하는데 패딩문자인 '='가 그 빈자리 만큼 들어가게 된다.

### 사용하는 이유 ?
Base64 Encoding을 하게되면 전송해야 될 데이터의 양도 약 33% 정도 늘어난다. 6bit당 2bit의 Overhead가 발생하기 때문이다. <br>
Encoding전 대비 33%나 데이터의 크기가 증가하고, Encoding과 Decoding에 추가 CPU 연산까지 필요한데 우리는 왜 Base64 Encoding을 하는가? <br>
문자를 전송하기 위해 설계된 Media(Email, HTML)을 이용해 플랫폼 독립적으로 Binary Data(이미지나 오디오)를 전송할 필요가 있을 떄, <br>
ASCII로 Encoding하여 전송하게 되면 여러가지 문제가 발생할 수 있다. <br>
1. ASCII는 7bits Encoding인데 나머지 1bit를 처리하는 방식이 시스템 별로 상이하다. <br>
2. 일부 제어문자의 경우 시스템 별로 다른 코드값을 갖는다. <br>

> 위와 같은 문제로 ASCII는 시스템간 데이터를 전달하기에 안전하지가 않다. Base64는 ASCII 중 제어문자와 일부 특수문자를 제외한 64개의 안전한<br>
> 출력 문자만 사용한다. (안전한 출력 문자는 문자 코드에 영향을 받지 않는 공통 ASCII를 의미한다.) <br>

즉, "Base64는 HTML 또는 Email과 같이 문자를 위한 Media에 Binary Data를 포함해야 될 필요가 있을 때, 포함된 Binary Data가 시스템 독립적
으로 동일하게 전송 또는 저장되는 걸 보장하기 위해 사용한다"라고 정의할 수 있다.<br>
<hr>

Header에는 typ와 alg 두 가지 정보로 구성되어 있다.
> typ : 토큰의 타입을 지정 <br>
> alg : 해싱 알고리즘을 지정, 주로 HMAC SHA256 또는 RSA를 사용하며 이 알고리즘은 **서명(signature)**에서 사용한다. <br>

### 형태 :
```swift
	{
		"alg": "HS256",
		"typ": "JWT"
	}
```
	
Payload에는 토큰에서 사용할 정보가 담겨있고 이를 위해서 설명한 클레임이라 부르는 것들이 저장되어 있다. <br>
Key/Value 방식으로 이루어져 있으며 (JSON과 유사) 다수의 정보를 넣을 수 있다. 이 클레임은 총 세가지로 나뉜다. <br>

## 등록된 클레임 (Registered Claim) <br>
등록된 클레임은 토큰 정보를 표현하기 위해 이미 정해진 데이터 종류이며, 모두 선택적으로 작성 가능하다. <br>

> iss: 토큰 발급자 (issuer) <br>
sub: 토큰 제목 (subject)<br>
aud: 토큰 대상자 (audience)<br>
exp: 토큰의 만료시간 (expiration)<br>
	- NumericDate 형식으로 되어있어야 한다. (Ex: 1480849147370)<br>
nbf: 토큰 활성 날짜<br>
	- 이 날짜가 지나기 전 토큰은 활성화 되지 않는다.<br>
iat: 토큰이 발급된 시간 (issued at)<br>
	- 이 값을 사용하여 토큰 발급 이후 얼마나 시간이 지났는지를 알 수 있다.<br>
jti: JWT의 고유 식별자<br>
	- 중복 방지를 위해 사용하며, 일회용 토큰(Access Token 등) 사용한다.<br>
	
	
## 공개 클레임 (Public Claim) <br>

공개 클레임은 서로 충돌이 일어나지 않는 이름을 가지고 있어야 한다. 그래서 URL 형태로 작성하며 예시는 아래와 같다.<br>

```swift
{ "https://hexlant.com": true }
```

## 비공개 클레임 (Private Claim)<br>

비공개 클레임은 실제 사용을 하는 개발자가 지정하는 것으로 서버와 클라이언트가 서로 정의하여 사용하는 클레임을 의미한다.<br>
```swift
{ "token_type": "access" }
```

결론적으로 페이로드는 아래와 같이 구성된다.
```swift
  {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  }
```  

마지막으로 Signature은 위에서 만든 Header와 Payload의 각 값을 BASE64로 인코딩 하고, 그 값을 비밀키를 이용해 헤더에서 정의한 <br>
알고리즘으로 (HS256이나 SHA256 등) 해싱을 하고, 이 값을 다시 BASE64로 인코딩하여 생성한다. <br>



### JWT 토큰 페이로드에는 BASE64로 인코딩만 될 뿐 이것을 다시 디코딩하여 정보를 얻을 수 있다. <br>
### 그래서 가급적 토큰에는 중요 정보를 담지 말자.  

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


> redux-promise ,redux-thunk (미들웨어)  
 store안의 state을 변경하려면 dispatch(action)을 이용해서만 변경가능, 이때 리덕스는 객체 형식의 action만 받을 수 있음,    
 때문에 function이나 promise 형태가 전달되면 해당 미들웨어를 사용해 > actio에 전달 해야함  
- redux-thunk : 리덕스 사용시 function 형태가 action에 전달 될 때 사용됨  
- redux-promise : promise 형태가 action에 전달 될 때 사용됨





