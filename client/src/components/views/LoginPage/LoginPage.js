
import React, {useState} from 'react'
import { useDispatch} from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    //타이핑을 할때 onChange 이벤트를 발생시켜 state 값을 변화시킴, state이 바뀌면 해당 값을 받는 value값이 변경

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        //핸들러가 수행하면 현재 위치의 value값 변경
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault(); //핸들러 수행시 바로 리랜더링 되는것 방지

        console.log('Email',Email)
        console.log('Password', Password)

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        //dispahch로 action을 만들고 그 안에 body를 넣음
        .then(response =>{
            if(response.payload.loginSuccess){
                props.history.push('/')
            } else {
                alert('Error')
            }

        })
    }

    return (
        <div style ={{
            display:'flex', justifyContent: 'center', alignItems: 'center'
            ,width:'100%', height:'100vh'
        }}>
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <lable>Email</lable>
                <input type="email" value={Email} onChange={onEmailHandler} />
                
                <label>Password</label>
                <input type = "password" value={Password} onChange={onPasswordHandler} />

                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
