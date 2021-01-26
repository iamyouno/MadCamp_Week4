import React, {useState, useEffect} from 'react';
import './Co_buying.css';
import { Link, Route, BrowserRouter as Router} from 'react-router-dom';
import Axios from 'axios';

function Co_buying(params) {
    const [buyContent, setBuyContent] = useState({
        id: '',
        name: '',
        member: '',
        info: ''
    })

    const [viewContent, setViewContent] = useState([])

    const [showWrite, setShowWrite] = useState(0)

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
        <div className='body'>
            <div className='wrap'>
                <h1 className='title'>Co-Buying</h1>
            </div>
            <div className='writeButton' onClick={() => setShowWrite(1)}>새 글 작성하기</div>

            {showWrite === 0 ? null : 
                <div className='showWrite'>
                    
                    {/* <div className='form-wrapper'> */}
                        <input className="small-input" type='text' placeholder='제목' onChange={getName} />
                        <input className="small-input_" type='text' placeholder='인원' onChange={getMember} />
                        
                        <textarea className='big-input' type='text' placeholder='내용' onChange={getInfo} />
                    {/* </div> */}
                    
                    <button className='close-button' onClick={() => setShowWrite(0)}>닫기</button>
                    <button className="submit-button" onClick={()=>{

                        if (buyContent.name == '') {alert('제목을 입력하시오'); return }
                        if (buyContent.member == '') {alert('인원을 입력하시오'); return }
                        if (buyContent.info == '') {alert('내용을 입력하시오'); return }
                        Axios.post('http://192.249.18.168:8080/api/cobuying', {
                            dorm: 'Jilli',
                            name: buyContent.name,
                            member: buyContent.member,
                            info: buyContent.info,
                            reply: []
                        }).then( function(response){
                            buyContent.id = response.data._id
                            console.log(buyContent.id)
                            setViewContent(viewContent.concat({...buyContent}))
                            setShowWrite(0)
                            setBuyContent({id: '',
                            name: '',
                            member: '',
                            info: ''})
                        });
                    }}>등록
                    </button>
                </div>
            }


            <div className='contents-container'>
                {viewContent.map(element => 
                    <Link to ={'/Co_buying/'+element._id} style={{display: 'block'}}>
                        <article>
                            <div className='each-content'>
                                <h3>{element.name}, {element.member}</h3>
                                <p>{element.info}</p>
                            </div>
                        </article>
                    </Link>)}
                
            </div>
            {/* <div className='form-wrapper'>
                <input className="small-input" type='text' placeholder='제목' onChange={getName} />
                <input className="small-input" type='text' placeholder='인원' onChange={getMember} />
                <textarea className="content" type='text' placeholder='내용' onChange={getInfo} />
            </div>
            <button className="submit-button" onClick={()=>{
                
                Axios.post('http://192.249.18.168:8080/api/cobuying', {
                    dorm: 'Jilli',
                    name: buyContent.name,
                    member: buyContent.member,
                    info: buyContent.info,
                    reply: []
                }).then( function(response){
                    buyContent.id = response.data._id
                    console.log(buyContent.id)
                    setViewContent(viewContent.concat({...buyContent}));
                });
            }}>입력</button> */}
        </div>
    );
}

export default Co_buying;