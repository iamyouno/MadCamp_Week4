import React from 'react';
import {Component} from 'react';
import {useState, useEffect} from 'react';
import './Free.css';
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab';
import { Checkbox } from '@material-ui/core';

function FreeWrite(){

    const [Content, setContent] = useState({
        title: '',
        content: ''
    })

    const submitContent = async () => {
        await Axios.post('http://localhost:3002/api/freeboard',{
            title: Content.title,
            content: Content.content,
            anonymous: checked
        },{withCredentials: true}).then(() => 
        alert('POST COMPLETE') //material ui로 바꿀 수 있음... collapse를 사용??
        )
        document.location.href = "/Jilli"
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
    
    const [checked, setChecked] = useState(true);

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return(
        <div className="Free">
        <h1>Free Board</h1>
        {/* <div className='movie-container'>
            {viewContent.map(element => 
                <div>
                    <h2>{element.title}</h2>
                    <div>
                        {element.content}
                    </div>
                </div>
            )}
        </div> */}
        <div className='form-wrapper'>
            <input className="title-input" type='text' placeholder='제목' onChange = {getValue} name = 'title' />
            <textarea className="text-area" placeholder='내용' onChange = {getContentValue}></textarea>
        </div>
        <>
            익명
            <Checkbox
                checked = {checked}
                onChange = {handleChange}    
            ></Checkbox>
        </>
        <button 
        className="submit-button"
        // onClick = {() => {
        //     setViewContent(viewContent.concat({...Content}));
        // }}
        onClick = {submitContent}
        >입력</button>
        </div>
    );

}

export default FreeWrite;