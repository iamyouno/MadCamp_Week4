import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom'
import './Jilli.css'

function JilliBoard(params) {

    const roomNum = useParams().roomNum

    const [postReplyContent, setPostReplyContent] = useState({
        roomNum: '',
        text: ''
    })

    const [replyContent, setReplyContent] = useState([])

    const [switchContent, setSwitchContent] = useState({
        switch: 'roomReply'
    })

    const [colorContent, setColorContent] = useState([
        {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}
    ])

    const [showButton, setShowButton] = useState({
        show: true
    })

    const [deleteButton, setDeleteButton] = useState({
        show: true
    })

    const[ User, setUser] = useState('');

    useEffect(()=>{
        Axios.get('http://localhost:3002/api/Jilli/'+roomNum).then((response)=>{
            setReplyContent(response.data)
        })
    }, [replyContent])

    useEffect(() => {
        setSwitchContent({switch: 'roomReply'})
        setColorContent([{color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}])
    }, roomNum)

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
    },[])

    const setColor = (num) => () => {
        if (showButton.show == true ){
            var list = [...colorContent]
            list[num] = {color: '#3f51b5'}
            setColorContent(list)
        }
    }

    const [isitClick, setIsItClick] = useState(0)

    const toggleColor = (num) => () => {
        if (colorContent[num].color == '#FFFFFF') {
            setColor(num)();
        }
        else {
            var list = [...colorContent]
            list[num] = {color: '#FFFFFF'}
            setColorContent(list)

        }
    }

    const toggleColor_ = (num) => () => {
        if (showButton.show == true){
            if (isitClick === 1){
                if (colorContent[num].color == '#FFFFFF') {
                    setColor(num)();
                }
                else {
                    var list = [...colorContent]
                    list[num] = {color: '#FFFFFF'}
                    setColorContent(list)

                }
            }
        }
    }

    const toggleColor__ = (num) => () => {
        if (showButton.show == true){
            setIsItClick(1)
            toggleColor(num)()
        }
    }

    const postReply = async () => {
        try{
        await Axios.post('http://localhost:3002/api/Jilli/'+roomNum, {
            roomNum: roomNum,
            text: postReplyContent.text
        },{withCredentials: true}).then( async function (response) {
            console.log("response")
            await Axios.get('http://localhost:3002/api/Jilli/'+roomNum).then((response)=>{
            setReplyContent(response.data)
            setPostReplyContent({
                ...postReplyContent,
                text: ''
            })
        })
        })} catch(err){
            console.log(err.response.data);
            alert('로그인 필요');
        }
    }

    const postRchange = async () => {
        var list = []
        var index = 0
        colorContent.map(element => {
            if (element.color === '#d39ebb') {list.push(index)}
            index ++
        })
        try{
            await Axios.post('http://localhost:3002/api/Jilli/rchange/'+roomNum, {
                roomNum: roomNum,
                select: colorContent
            },{withCredentials: true}).then(function (response) {
                console.log("response rchange")
                setShowButton({show: false})
                setDeleteButton({show:true})
                // setColorContent([{color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}])
            })
        } catch(err){
            console.log(err.response.data)
            alert('로그인 필요')
        }
    }

    const roomChange = async ()=> {
        setSwitchContent({switch: 'roomChange'})
            await Axios.get('http://localhost:3002/api/Jilli/rchange/'+roomNum).then((response) =>{
                console.log(response.data.length)
                if (response.data.length != 0) { 
                    setColorContent(response.data[0].select)
                    setShowButton({show: false})
                    if(User === response.data[0].user_id){
                        setDeleteButton({show: true})
                    } else{
                        setDeleteButton({show: false})
                    }
                }else{
                    setShowButton({show: true})
                    setDeleteButton({show: false})
                }      
            })
        }

    const delRchange = () => {
        Axios.delete('http://localhost:3002/api/Jilli/rchange/'+roomNum, {withCredentials: true})
            .then((response) => {
                setShowButton({show: true})
                setDeleteButton({show: false})
                setColorContent([{color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}])
            })

    }

    return(
        <div className='Jillibody' onMouseUp={()=>setIsItClick(0)}>
            <div className='roomMemo' >
                <ul className='roomNavi'>
                    <li onClick={ ()=> setSwitchContent({ ...switchContent, switch: 'roomReply'})}> 방명록 </li>
                    <li onClick={roomChange}> 입퇴사 기간</li> 
                </ul>

                {switchContent.switch === 'roomReply' ? 
                <div>   
                    <div className='roomTitle'> {roomNum}호 방명록 </div>
                    {replyContent.map(element =>
                    <div className='guestBkReply'><div>{element.text}</div></div>)}
                    <div className='input_button'>
                        <input value={postReplyContent.text} onChange={e => {
                            const {_, value} = e.target
                            setPostReplyContent({
                                ...postReplyContent,
                                text: value
                            })
                        }}></input>
                        <button className='guestBkReplyBut'onClick={postReply}>입력</button>
                    </div>
                </div> : 
                
                <div>
                    <div className='timeLines'>
                        <div className='timeLine'>08시</div>
                        <div className='timeLine'>10시</div>
                        <div className='timeLine'>12시</div>
                        <div className='timeLine'>14시</div>
                        <div className='timeLine'>16시</div>
                        <div className='timeLine'>18시</div>
                        <div className='timeLine'>20시</div>
                        <div className='timeLine'>22시</div>
                        <div className='timeLine'>24시</div>
                    </div>
                    <div className='timeTable'>
                        <div className='timeBlock_' onMouseDown={toggleColor__(0)} onMouseUp={()=>setIsItClick(0)} onMouseOver={toggleColor_(0)} style={{background: colorContent[0].color}}></div>
                        <div className='timeBlock'  onMouseDown={toggleColor__(1)} onMouseUp={()=>setIsItClick(0)} onMouseOver={toggleColor_(1)} style={{background: colorContent[1].color}}></div>
                        <div className='timeBlock'  onMouseDown={toggleColor__(2)} onMouseUp={()=>setIsItClick(0)} onMouseOver={toggleColor_(2)} style={{background: colorContent[2].color}}></div>
                        <div className='timeBlock'  onMouseDown={toggleColor__(3)} onMouseUp={()=>setIsItClick(0)} onMouseOver={toggleColor_(3)} style={{background: colorContent[3].color}}></div>
                        <div className='timeBlock'  onMouseDown={toggleColor__(4)} onMouseUp={()=>setIsItClick(0)} onMouseOver={toggleColor_(4)} style={{background: colorContent[4].color}}></div>
                        <div className='timeBlock'  onMouseDown={toggleColor__(5)} onMouseUp={()=>setIsItClick(0)} onMouseOver={toggleColor_(5)} style={{background: colorContent[5].color}}></div>
                        <div className='timeBlock'  onMouseDown={toggleColor__(6)} onMouseUp={()=>setIsItClick(0)} onMouseOver={toggleColor_(6)} style={{background: colorContent[6].color}}></div>
                        <div className='timeBlock'  onMouseDown={toggleColor__(7)} onMouseUp={()=>setIsItClick(0)} onMouseOver={toggleColor_(7)} style={{background: colorContent[7].color}}></div>
                        <div className='timeBlock'/>
                    </div>

                    {showButton.show === true ? <button className='timePostButton' onClick={postRchange}>등록</button> : null}

                    {deleteButton.show === true ? <button className='timeDelButton' onClick={delRchange}>삭제</button> : null}
                    
                </div>
                }
            </div>
        </div>
    )
}

export default JilliBoard