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

    useEffect(()=>{
        Axios.get('http://192.249.18.168:8080/api/Jilli/'+roomNum).then((response)=>{
            setReplyContent(response.data)
        })
    }, [replyContent])

    useEffect(() => {
        setSwitchContent({switch: 'roomReply'})
        setColorContent([{color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}])
    }, roomNum)

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

    const postReply = () => {
        Axios.post('http://192.249.18.168:8080/api/Jilli/'+roomNum, {
            roomNum: roomNum,
            text: postReplyContent.text
        }).then(function (response) {
            console.log("response")
            Axios.get('http://192.249.18.168:8080/api/Jilli/'+roomNum).then((response)=>{
            setReplyContent(response.data)
            setPostReplyContent({
                ...postReplyContent,
                text: ''
            })
        })
        })
    }

    const postRchange = () => {
        var list = []
        var index = 0
        colorContent.map(element => {
            if (element.color === '#d39ebb') {list.push(index)}
            index ++
        })

        Axios.post('http://192.249.18.168:8080/api/Jilli/rchange/'+roomNum, {
            roomNum: roomNum,
            select: colorContent
        }).then(function (response) {
            console.log("response rchange")
            setShowButton({show: false})
            // setColorContent([{color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}])
        })
    }

    const roomChange = ()=> {
        setSwitchContent({switch: 'roomChange'})
        Axios.get('http://192.249.18.168:8080/api/Jilli/rchange/'+roomNum).then((response) =>{
            console.log(response.data.length)
            if (response.data.length != 0) { 
                setColorContent(response.data[response.data.length-1].select)
                setShowButton({show: false})}
            else{
                setShowButton({show: true})
            }      
        })
    }

    return(
        <div className='body' onMouseUp={()=>setIsItClick(0)}>
            <div className='roomMemo' >
                <ul className='roomNavi'>
                    <li onClick={ ()=> setSwitchContent({ ...switchContent, switch: 'roomReply'})}> 방명록 </li>
                    <li onClick={roomChange}> 입퇴사 기간 체크</li> 
                </ul>

                {switchContent.switch === 'roomReply' ? 
                <div>   
                    <div className='roomTitle'> {roomNum}호 방명록 </div>
                    {replyContent.map(element =>
                    <div className='gusetBkReply'><div>{element.text}</div></div>)}
                    <div className='input_button'>
                        <input value={postReplyContent.text} onChange={e => {
                            const {_, value} = e.target
                            setPostReplyContent({
                                ...postReplyContent,
                                text: value
                            })
                        }}></input>
                        <button className='gusetBkReplyBut'onClick={postReply}>입력</button>
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

                    {showButton.show === true ? <button onClick={postRchange}>등록</button> : null}
                    
                </div>
                }
            </div>
        </div>
    )
}

export default JilliBoard