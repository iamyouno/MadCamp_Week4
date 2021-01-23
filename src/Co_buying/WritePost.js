import React, {useState, useEffect} from 'react';
import './WritePost.css';
import { Link, Route, BrowserRouter as Router} from 'react-router-dom';
import Axios from 'axios';

function WritePost(params) {
    const [buyContent, setBuyContent] = useState({
        id: '',
        name: '',
        member: '',
        info: ''
    })

    const [viewContent, setViewContent] = useState([])

    useEffect(() => {
        Axios.get('http://192.249.18.168:8080/api/Jilli').then((response)=>{
            // console.log(response.data._id)
            setViewContent(response.data);
        })
    }, [viewContent])

    const getName = e => {
        const {_, value} = e.target;
        setBuyContent({
            ...buyContent,
            name: value
        })
        console.log(buyContent);
    }

    const getMember = e => {
        const {_, value} = e.target;
        setBuyContent({
            ...buyContent,
            member: value
        })
        console.log(buyContent);
    }

    const getInfo = e => {
        const {_, value} = e.target;
        setBuyContent({
            ...buyContent,
            info: value
        })
        console.log(buyContent);
    }

    return(
        <div className="App">
            <h1>Co-Buying</h1>
            <div className='movie-container'>
            {viewContent.map(element => 
                <Link to ={'/co_buying/'+element._id}>
                    <div className='each-content'>
                        <h3>{element.name}, {element.member}</h3>
                        <p>{element.info}</p>
                    </div>
                </Link>)}
            </div>
            <div className='form-wrapper'>
                <input className="title-input" type='text' placeholder='제목' onChange={getName} />
                <input className="title-input" type='text' placeholder='인원' onChange={getMember} />
                <input className="title-input" type='text' placeholder='내용' onChange={getInfo} />
            </div>
            <button className="submit-button" onClick={()=>{
                
                Axios.post('http://192.249.18.168:8080/api/cobuying', {
                    dorm: 'Jilli',
                    name: buyContent.name,
                    member: buyContent.member,
                    info: buyContent.info
                }).then( function(response){
                    buyContent.id = response.data._id
                    console.log(buyContent.id)
                    setViewContent(viewContent.concat({...buyContent}));
                });
            }}>입력</button>
        </div>
    );
}

export default WritePost;