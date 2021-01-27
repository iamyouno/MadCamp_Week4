import React from 'react';
import Axios from 'axios';
import { withCookies, useCookies } from 'react-cookie';
import {useState, useEffect} from 'react';
import { Link, Route, BrowserRouter as Router , Redirect, Switch, withRouter} from 'react-router-dom'
import './style/User.css'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/Person';

function User(props) {

    const [my, setMy] = useState({
        user_id : '',
        user_name : ''
    });

    useEffect( async ()=>{
        try{
            await Axios.get('http://192.249.18.133:3002/api/users/user',{withCredentials: true}).then(
                (response) => {
                    setMy(response.data);
                }
        )} catch(err){
            console.log(err.response.data)
            alert("로그인 필요")
            ///alert 누르면 로그인 창으로 돌아가기....
        }
    },[]) // ID 불러옴

    const handlelogout = async () => {
        await props.removeCookie();
        props.history.push("/")
    }

    return (
        <section className = "Usercontainer">
            <div className = "Usertitle">
                <h1>내 정보</h1>
                <div className = "Userlogout">                        
                    <Button 
                        onClick = {() => handlelogout()}
                        variant="outlined"
                        color="primary"
                    ><h3 style ={{fontSize: "17px"}}>Logout</h3>
                    </Button> 
                </div>
            </div>
            <div className = "Userprofile">
                <h3>{my.user_id}</h3>
                <p>
                    <span>{my.user_name}</span> 
                </p>
            </div>
            
        </section>
    )
}

export default withRouter(User);
