import React from 'react';
import { Link, Route, BrowserRouter as Router} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import "./style/Join.css"

function Join(){

    const [ userId, setUserId ] = useState('');
    const [ userPw, setUserPw ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ isJoinSuccess, setJoinSuccess ] = useState(false);

    const createUserApi = (user) => {
        return Axios.post('http://localhost:3002/api/users/new',
            user).then((response) => response.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUserApi({
                user_id: userId,
                user_pw: userPw,
                user_name: userName
            });
            if (response.result === 'ok') {
                setJoinSuccess(true);
            }
            if (response.error){
                alert(response.error);
            }
        } catch (err) {
            console.error('login error', err);
            console.log(err.message.data); //err 메세지 구분 피룡....
            alert('회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.')
        }
    };
    

    return(
        <div>
            {!isJoinSuccess && (
                <>
                    <h2>Join</h2>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="user_id"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                            placeholder="아이디"
                        />
                        <input
                            type="password"
                            name="user_pw"
                            value={userPw}
                            onChange={e => setUserPw(e.target.value)}
                            placeholder="비밀번호"
                        />
                        <input
                            type="text"
                            name="user_name"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="이름"
                        />
                        <button
                            type="submit"
                        >
                        제출
                        </button>
                    </form>
                </>
            )}
            {isJoinSuccess && (
                <div>
                    <p>회원가입을 축하합니다!</p>
                    <Link to="/login">로그인</Link>
                </div>
            )}
        </div>
    )
}

export default Join;