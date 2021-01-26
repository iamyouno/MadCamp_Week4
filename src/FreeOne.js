import React from 'react';
import {Component} from 'react';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab';
import { Link, Route, BrowserRouter as Router, useParams} from 'react-router-dom';
import './style/FreeOne.css'
import { Checkbox } from '@material-ui/core';

import Create from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function FreeOne(){

    var params = useParams();
    const id = params.freeid;

    const[ Delete, setDelete] = useState(false)

    const[ User , setUser] = useState('')

    // var board = {
    //     title : '',
    //     content : ''
    // }


    const [Content, setContent] = useState({
        title: '',
        content: '',
        userid: '',
        anonymous: false
    })

    const[Comment, setComment] = useState({
        commentcontent: '',
        anonymous: true,
        userid: ''
    })

    useEffect( async ()=>{
        try{
            await Axios.get('http://localhost:3002/api/users/check',{withCredentials: true}).then(
                (response) => {
                    setUser(response.data.user_id);
                    console.log(response.data.user_id);
                }
        )} catch(err){
            console.log(err.response.data)
        }
    },[]) // ID 불러옴


    const submitComment = async (e) => {
        e.preventDefault()
        if(Comment.commentcontent == ""){
            alert('내용을 입력하세요')
        } else {
            try{
                await Axios.put('http://localhost:3002/api/freeboard/'+ id,{
                    commentcontent: Comment.commentcontent,
                    anonymous: checked
                },{withCredentials: true}).then(() => 
                {alert('POST COMPLETE'); //material ui로 바꿀 수 있음... collapse를 사용??
                setComment({...Comment, commentcontent: ''})
                })
                console.log(Comment.commentcontent);
            }catch(err){
                console.log(err.response.data)
                alert('로그인 필요')
            }
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

    useEffect( async () => {
        try{
            await Axios.get('http://localhost:3002/api/freeboard/'+ id).then((response)=>{
                setContent({
                    title: response.data.title,
                    content: response.data.content,
                    userid: response.data.userid,
                    anonymous: response.data.anonymous
                });
                setviewComment(response.data.comment);
                // console.log("반복")
                // console.log(response.data.comment)
        })} catch(err){
            setDelete(true)
        }
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

    const makeDelete = async (commentid) => {
        console.log("여기도 반복?")
        console.log(commentid)
        try{
            await Axios.delete('http://localhost:3002/api/freeboard/'+ id,{ data: {commentid : commentid} , withCredentials: true}).then( (res) => {
                console.log("느려지나?");
                setviewComment(res.data.comment);
            })
        }
        catch(err){
            console.log(err.response.data);
            // setviewComment(...viewComment);
        }
    }

    const BoardDelete = async() => { 
        try{
            await Axios.delete('http://localhost:3002/api/freeboard/delete/'+ id, {withCredentials: true}).then(
                (res) =>{
                    document.location.href = "/Jilli"
                })
        } catch(err){

        }
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
                {Delete && (
                    <article className = "dialog">
                        글이 존재하지 않습니다. 
                    </article>
                )}
                
                {! Delete && 
                    (<article>
                        <div className = "article">
                            <div className = "profile">
                                <h3 className = "large">{Content.anonymous ? ("익명"):(Content.userid)}</h3>
                            </div>
                            <div className = "status">
                            {( User ===  Content.userid ) && (<div className = "update">수정</div>)}
                            {( User === Content.userid ) && (<div className = "delete" onClick = {() => BoardDelete()} >삭제</div>)}
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
                                        <div className = "status">
                                            {( User === element.userid ) && (<div className = "delete" onClick = {() => makeDelete(element._id)} >삭제</div>)}
                                        </div>
                                        <hr></hr>
                                        <p className = "large">{element.commentcontent}</p> 
                                        <hr></hr> 
                                    </div>
                                </article>)}
                                <form className = "writecomment " onSubmit = {submitComment}>
                                    <input
                                        value = {Comment.commentcontent}
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
                                            type = "submit"
                                            variant="outlined"
                                            color="primary"
                                        ><Create style ={{marginTop: "-3px"}}></Create></IconButton>
                                    </div>
                                </form>
                            </div>  
                        </div>
                    </article>)
                }
            </div>    
        </div> 
    );

}

export default FreeOne;