import React,{useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    useEffect(() =>{
        //index.js(서버사이드)에 end 포인트 전환, 반환된 response를 출력
        axios.get('/api/hello')
        .then(response => console.log(response))

        
    },[]) //랜더링 될때 한번만 시행 


    const onClickHandler = () =>{
        axios.get(`/api/users/logout`)
        .then(response =>{
            if(response.data.success){
                props.history.push("/login")
            } else {
                alert('로그아웃에 실패 했습니다.')
            }
        })
    }

    return (
        <div style ={{
            display:'flex', justifyContent: 'center', alignItems: 'center'
            ,width:'100%', height:'100vh', flexDirection: 'column'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
            {/* style={{display:'none'}} */}
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
