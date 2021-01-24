import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Axios from 'axios'
import './ViewContent.css'

function ViewContent() {

    var body = useParams()

    const [replyContent, setReplyContent] = useState({
        content:''
    })

    const [viewReplyContent, setViewReplyContent] = useState([])

    const [viewContent, setViewContent] = useState([])

    useEffect(() => {
        Axios.get('http://192.249.18.168:8080/api/cobuying/'+body.id, {params: {id: body.id}}).then((response)=>{
            setViewContent(response.data)
        })
    }, [viewContent])


    const writeReply = e => {
        const {_, value} = e.target;
        setReplyContent({
            ...replyContent,
            content: value
        })
        console.log(replyContent)
    }

    return(
        <div>
            {viewContent.map(element => 
            <div className='each-content'>
                <h3>{element.name}, {element.member}</h3>
                <p>{element.info}</p>
            </div>
            )}


            <div>
                <input input className="title-input" type='text' placeholder='댓글' onChange = {writeReply}/>
                <button className='button' onClick = {()=>{
                    console.log("hi")
                    setViewReplyContent(viewReplyContent.concat({...replyContent}))
                    console.log(viewReplyContent)
                }}>등록</button>
            </div>
            <div>
                {viewReplyContent.map(element => 
                    <div>{element.content}</div>)}
            </div>
        </div>
    )
}

export default ViewContent