import React from 'react';
import {Component} from 'react';
import {useState, useEffect} from 'react';
import './style/Free.css'
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab';
import { NavLink ,Link, Route, BrowserRouter as Router} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/icons/BorderColor';

function Free(){

    const [Content, setContent] = useState({
        _id: '',
        userid: '',
        title: '',
        content: '',
        anonymous: false
    })

    const submitContent = () => {
        Axios.post('http://192.249.18.133:3002/api/freeboard',{
            title: Content.title,
            content: Content.content
        }).then(() => 
        alert('POST COMPLETE') //material ui로 바꿀 수 있음... collapse를 사용??
        )
    }

    // const getContent = () =>{
    //     Axios.get('http://localhost:3002/api/freeboard').then((response)=>{
    //         setViewContent(response.data);
    //     })
    // }

    

    const [viewContent, setViewContent] = useState([]);

    const getValue = e => {
        const {name, value} = e.target;
        setContent({
            ...Content, ////javascript ... 문법 이해 필요
            [name]: value
        })
    };

    const getContentValue = (e) => {
        const data = e.target.value;
        setContent({
            ...Content,
            content: data
        })
        console.log(Content);
    }

    useEffect(() => {
        Axios.get('http://192.249.18.133:3002/api/freeboard').then((response)=>{
            setViewContent(response.data.reverse());
        })
    },[viewContent]) // useEffect 인자로 state 보내주면 state 바뀔때마다 useEffect 실행....
    
    // const getData = ()=>{
    //     fetch('http://localhost:3002/api')
    //         .then((res) => res.json())
    //         .then((res) => (res.greeting));
    // };

    // var apiResponse = {greeting: getData()}
    
    return(
        <div className = "Freetotal-container">
        <div className = "Freetitle-wrap">
            <h1>자유 게시판</h1>
        </div>
        <div className="Freeboard-container">
            <div className = "Freearticles">
                <div>
                    <Link to='/Jilli/freeboard/write'>
                        <Button 
                            className="submit-button"
                            variant="outlined"
                            color="primary"
                            startIcon={<Icon />}
            
                            // onClick = {() => {
                            //     setViewContent(viewContent.concat({...Content}));
                            // }}
                            // onClick = {submitContent}
                            >글쓰기</Button>
                    </Link>
                </div>
            {viewContent.map(element => 
                <NavLink to = {'/Jilli/freeboard/write/' + element._id}>
                    <article>
                        <div className = "article">
                            <h2 className = "medium">{element.title}</h2>
                            <p className = "small">
                                {element.content}
                            </p>
                            <h3 className ="small">{element.anonymous ? ("익명"):(element.userid)}</h3>
                            <hr></hr>
                        </div>
                    </article>
                </NavLink>
            )}
            </div>
        </div>
        {/* <div className='form-wrapper'>
            <input className="title-input" type='text' placeholder='제목' onChange = {getValue} name = 'title' />
            <textarea className="text-area" placeholder='내용' onChange = {getContentValue}></textarea>
        </div> */}
        </div>
    );

}


export default Free;