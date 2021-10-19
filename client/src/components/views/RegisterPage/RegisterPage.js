import React, {useState} from 'react'
import { useDispatch} from 'react-redux'
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
        const dispatch = useDispatch();
    
        const [Email, setEmail] = useState("")
        const [Password, setPassword] = useState("")
        const [Name, setname] = useState("")
        const [ConfirmPassword, setConfirmPassword] = useState("")

        //타이핑을 할때 onChange 이벤트를 발생시켜 state 값을 변화시킴, state이 바뀌면 해당 값을 받는 value값이 변경
    
        const onEmailHandler = (event) =>{
            setEmail(event.currentTarget.value)
        }
    
        const onNameHandler = (event) => {
            //핸들러가 수행하면 현재 위치의 value값 변경
            setname(event.currentTarget.value)
        }

        const onPasswordHandler = (event) =>{
            setPassword(event.currentTarget.value)
        }

        const onConfirmPasswordHandler = (event) =>{
            setConfirmPassword(event.currentTarget.value)
        }
    
        const onSubmitHandler = (event) =>{
            event.preventDefault(); //핸들러 수행시 바로 리랜더링 되는것 방지
    
            if(Password !== ConfirmPassword){ // 비밀번호와 비밀번호 확인 비교 
                return alert('비밀번호 확인이 같지 않습니다.')
            }
        
            let body = {
                email: Email,
                password: Password,
                name:Name
            }
    //dispahch로 action을 만들고 그 안에 body를 넣음
            dispatch(registerUser(body))
            .then(response =>{
                if(response.payload.success){
                    props.history.push("/login")
                } else {
                        alert('Failed to sign up')
                    }


                // if(response.payload.loginSuccess){
                //     props.history.push('/login')
                // } else {
                //     alert('Failed to sign up')
                // }
                
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

                <lable>Name</lable>
                <input type="text" value={Name} onChange={onNameHandler} />

                <lable>Password</lable>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                
                <label>Confirm Password</label>
                <input type = "password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )

}
export default withRouter(RegisterPage)
