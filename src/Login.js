import React from 'react';
import { Link, Route, BrowserRouter as Router} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Axios from 'axios';

function Login({setHasCookie}){
    
    const [ userId, setUserId ] = useState('');
    const [ userPw, setUserPw ] = useState('');

    const loginApi = (user) => {
        return Axios.post('http://localhost:3002/api/users/login',
            user, {withCredentials: true} ).then((response) => response.data);
        
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!userId || !userPw){
            return;
        }

        try{
            const response = await loginApi({
                user_id: userId,
                user_pw: userPw
            });

            if(response.result == 'ok'){
                //
                setHasCookie(true)
                document.location.href = "/"
                console.log(response.token)
            } else {
                throw new Error(response.error);
            }
        }catch(err){
            alert('로그인 실패');
            setUserId('');
            setUserPw('');
            console.error('login error', err);
        }

    }

    return(
        <div>
        <form onSubmit = {handleSubmit}>
            <input
                type="text"
                placeholder="아이디"
                value = {userId} // 적혀있는 값을 변경....
                onChange = {e => setUserId(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value = {userPw} // 적혀있는 값을 변경....
                onChange = {e => setUserPw(e.target.value)}
            />
        <button type = "submit"
        >로그인</button>
        </form> 
            <Link to="/Join">
            회원가입
            </Link>
        </div>

    )
}

export default Login;