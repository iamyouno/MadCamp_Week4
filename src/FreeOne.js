import React from 'react';
import {Component} from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab';
import { Link, Route, BrowserRouter as Router, useParams} from 'react-router-dom';
import './FreeOne.css'
import { Checkbox } from '@material-ui/core';

import Create from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function FreeOne(){

    var params = useParams();
    const id = params.freeid;

    // var board = {
    //     title : '',
    //     content : ''
    // }


    const [Content, setContent] = useState({
        title: '',
        content: ''
    })

    const[Comment, setComment] = useState({
        commentcontent: '',
        anonymous: true,
        userid: ''
    })

    const submitComment = () => {
        if(Comment.commentcontent == ""){
            alert('내용을 입력하세요')
        } else {
            Axios.put('http://localhost:3002/api/freeboard/'+ id,{
                commentcontent: Comment.commentcontent,
                anonymous: checked
            },{withCredentials: true}).then(() => 
            alert('POST COMPLETE') //material ui로 바꿀 수 있음... collapse를 사용??
            )
            console.log(Comment.commentcontent);
        }
    }

    // const getContent = () =>{
    //     Axios.get('http://localhost:3002/api/freeboard').then((response)=>{
    //         setViewContent(response.data);
    //     })
    // }

    

    const [viewComment, setviewComment] = useState([]);

    const getValue = e => {
        const commentcontent = e.target.value;
        setComment({
            commentcontent: commentcontent
        })
        console.log(Comment);
    };

    // const getContentValue = (e) => {
    //     const data = e.target.value;
    //     setContent({
    //         ...Content,
    //         content: data
    //     })
    //     console.log(Content);
    // }

    useEffect(() => {
        Axios.get('http://localhost:3002/api/freeboard/'+ id).then((response)=>{
            setContent({
                title: response.data.title,
                content: response.data.content
            });
            setviewComment(response.data.comment);
        })
    },[viewComment]); // useEffect 인자로 state 보내주면 state 바뀔때마다 useEffect 실행....

    
    // // const getData = ()=>{
    // //     fetch('http://localhost:3002/api')
    // //         .then((res) => res.json())
    // //         .then((res) => (res.greeting));
    // // };

    // // var apiResponse = {greeting: getData()}

    const [checked, setChecked] = useState(true);

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return(
        // <div className="Free">
        // <h1>Free Board</h1>
        // <div className='movie-container'>
        //     {viewContent.map(element => 
        //         <div>
        //             <Link to = '/Jilli/freeboard/:freeid'>
        //                 <button>
        //                     <h2>{element.title}</h2>
        //                     <div>
        //                         {element.content}
        //                     </div>
        //                 </button>
        //             </Link>
        //         </div>
        //     )}
        // </div>
        // {/* <div className='form-wrapper'>
        //     <input className="title-input" type='text' placeholder='제목' onChange = {getValue} name = 'title' />
        //     <textarea className="text-area" placeholder='내용' onChange = {getContentValue}></textarea>
        // </div> */}
        // <Link to='/Jilli/freeboardwrite'>
        //     <button 
        //     className="submit-button"
        
        //     // onClick = {() => {
        //     //     setViewContent(viewContent.concat({...Content}));
        //     // }}
        //     // onClick = {submitContent}
        //     >글쓰기</button>
        // </Link>
        // </div>
        <div className = "FreeOnearticle-container">
            <div className = "FreeOnetitle-wrap">
                <h1>자유게시판</h1>
            </div>
            <div className = "FreeOnearticles-wrap">
                <article>
                    <div className = "article">
                        <div className = "profile">
                            <h3 className = "large">익명</h3>
                        </div>
                        <hr></hr>
                        <h2 className="large">{Content.title}</h2>
                        <p className="large">{Content.content}</p>
                        <hr></hr>
                        <div className = "comment">
                            {viewComment.map(element =>
                            <article >
                                <div className = "parent">
                                    <h3 className = "medium">{element.anonymous ? ("익명"):(element.userid)}</h3>
                                    <hr></hr>
                                    <p class = "large">{element.commentcontent}</p> 
                                    <hr></hr> 
                                </div>
                            </article>)}
                            <form className = "writecomment">
                                <input
                                    type="text"
                                    className="text"
                                    placeholder="댓글을 입력하세요."
                                    onChange = {getValue}
                                />
                                <div className = "option">
                                    <FormControlLabel
                                        className = "anonym"
                                        label = "익명"
                                        control = {<Checkbox
                                            color="primary"
                                            checked = {checked}
                                            onChange = {handleChange}    
                                        />}
                                        labelPlacement = "start"
                                    >
                                    </FormControlLabel>
                                    <IconButton 
                                        onClick = {submitComment}
                                        variant="outlined"
                                        color="primary"
                                    ><Create style ={{marginTop: "-3px"}}></Create></IconButton>
                                </div>
                            </form>
                        </div>  
                    </div>
                </article>
            </div>    
        </div> 
    );

}

export default FreeOne;