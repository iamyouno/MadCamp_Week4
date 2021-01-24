import React from 'react';
import {Component} from 'react';
import {useState, useEffect} from 'react';
import './Free.css';
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab';
import { NavLink ,Link, Route, BrowserRouter as Router} from 'react-router-dom';
import FreeWrite from './FreeWrite';

function Free(){

    const [Content, setContent] = useState({
        _id: '',
        userid: '',
        title: '',
        content: '',
        anonymous: false
    })

    const submitContent = () => {
        Axios.post('http://localhost:3002/api/freeboard',{
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
        Axios.get('http://localhost:3002/api/freeboard').then((response)=>{
            setViewContent(response.data);
        })
    },[viewContent]) // useEffect 인자로 state 보내주면 state 바뀔때마다 useEffect 실행....
    
    // const getData = ()=>{
    //     fetch('http://localhost:3002/api')
    //         .then((res) => res.json())
    //         .then((res) => (res.greeting));
    // };

    // var apiResponse = {greeting: getData()}
    
    return(
        <div className="Free">
        <h1>Free Board</h1>
        <div className='movie-container'>
            {viewContent.map(element => 
                <div>
                    <NavLink to = {'/Jilli/freeboardwrite/' + element._id}>
                        <button>
                            <h2>{element.title}</h2>
                            {element.anonymous ? (<h3>익명</h3>):(<h3>{element.userid}</h3>)}
                            <div>
                                {element.content}
                            </div>
                        </button>
                    </NavLink>
                </div>
            )}
        </div>
        {/* <div className='form-wrapper'>
            <input className="title-input" type='text' placeholder='제목' onChange = {getValue} name = 'title' />
            <textarea className="text-area" placeholder='내용' onChange = {getContentValue}></textarea>
        </div> */}
        <Link to='/Jilli/freeboardwrite'>
            <button 
            className="submit-button"
        
            // onClick = {() => {
            //     setViewContent(viewContent.concat({...Content}));
            // }}
            // onClick = {submitContent}
            >글쓰기</button>
        </Link>
        </div>
    );

}


export default Free;