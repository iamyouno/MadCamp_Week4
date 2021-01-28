import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Axios from 'axios'

function EachBuying() {

    var body = useParams()
    
    const [replyContent, setReplyContent] = useState({
        content:''
    })

    const [viewReplyContent, setViewReplyContent] = useState([])

    const [viewContent, setViewContent] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3002/api/cobuying/'+body.id).then((response)=>{
            setViewContent(response.data)
        })
    }, [viewContent])

    useEffect(() => {
        Axios.get('http://localhost:3002/api/cobuying/'+body.id).then((response)=>{
            setViewReplyContent(response.data[0].reply)
        })
    }, [])

    const writeReply = e => {
        const {_, value} = e.target;
        setReplyContent({
            ...replyContent,
            content: value
        })
    }

    const postReply = () => {
        setViewReplyContent(viewReplyContent.concat(replyContent.content))
        console.log(replyContent.content)
        Axios.get('http://localhost:3002/api/cobuying/'+body.id).then((response) => {
            var list  = response.data[0].reply.concat(replyContent.content)
            Axios.put('http://localhost:3002/api/cobuying/'+body.id, list).then((response)=>{
                console.log("put okay")
            })
        })
        
        setReplyContent({
            ...replyContent,
            content: ''
        })
    }

    return(
        <div>
            {viewContent.map(element => 
            <div className='each-content'>
                <h3>{element.name}, {element.member}</h3>
                <p>{element.info}</p>
            </div>
            )}
            
            {viewReplyContent.map(element => 
                <div>{element}</div>)}

            <div>
                <input input className="title-input" type='text' placeholder='댓글' value={replyContent.content} onChange = {writeReply}/>
                <button onClick = {postReply}>등록</button>
            </div>
        </div>
    )
}

export default EachBuying