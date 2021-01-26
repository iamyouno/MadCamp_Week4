import React, {useEffect, useState} from 'react'
import './Jilli.css'
import { Link, NavLink } from 'react-router-dom';
import Axios from 'axios';

function Jilli(params) {

    const [viewContent, setViewContent] = useState({
        viewRoomNum: ''
    })

    const [postReplyContent, setPostReplyContent] = useState({
        roomNum: '',
        text: ''
    })

    const [replyContent, setReplyContent] = useState([])

    const [switchContent, setSwitchContent] = useState({
        switch: 'roomReply'
    })

    const [colorContent, setColorContent] = useState([
        {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}
    ])

    const [showButton, setShowButton] = useState({
        show: true
    })

    const setColor = (num) => () => {
        if (showButton.show == true ){
        var list = [...colorContent]
        list[num] = {color: '#d39ebb'}
        setColorContent( 
            list
        )
        console.log(colorContent)
        }

    }

    const roomMemo = (roomNum) => () => {
        setViewContent({
            ...viewContent,
            viewRoomNum: roomNum
        })

        setPostReplyContent({
            ...postReplyContent,
            roomNum: roomNum
        })

        setSwitchContent({
            ...switchContent,
            switch: 'roomReply'
        })

        setColorContent([
            {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}
        ])

        Axios.get('http://192.249.18.168:8080/api/Jilli/'+roomNum).then((response)=>{
            setReplyContent(response.data)
        })
    }

    const postReply = () => {
        Axios.post('http://192.249.18.168:8080/api/Jilli/'+postReplyContent.roomNum, {
            roomNum: postReplyContent.roomNum,
            text: postReplyContent.text
        }).then(function (response) {
            console.log("response")
            Axios.get('http://192.249.18.168:8080/api/Jilli/'+postReplyContent.roomNum).then((response)=>{
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

        Axios.post('http://192.249.18.168:8080/api/Jilli/rchange/'+postReplyContent.roomNum, {
            roomNum: postReplyContent.roomNum,
            select: colorContent
        }).then(function (response) {
            console.log("response rchange")
            
        })
    }

    const roomChange = ()=> {
        setSwitchContent({ ...switchContent, switch: 'roomChange'})
        Axios.get('http://192.249.18.168:8080/api/Jilli/rchange/'+postReplyContent.roomNum).then((response) =>{
            console.log(response.data.length)
            if (response.data.length != 0) { 
                console.log(response.data[response.data.length-1].select)
                setColorContent(response.data[response.data.length-1].select)
                setShowButton({show: false})
                console.log(showButton) }
            else{
                setShowButton({show: true})
            }      
        })
    }

    return(
        <div className='body'>
            <div className='room'>
                <table>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td rowSpan='3' className='hall'>HALL</td>
                        <td><div onClick={roomMemo(116)} style={{cursor:'pointer'}}>116</div></td>
                        <td><div onClick={roomMemo(118)} style={{cursor:'pointer'}}>118</div></td>
                        <td><div onClick={roomMemo(120)} style={{cursor:'pointer'}}>120</div></td>
                        <td><div onClick={roomMemo(122)} style={{cursor:'pointer'}}>122</div></td>
                        <td><Link to ='/Jilli/124'><div>124</div></Link></td>
                        <td><Link to ='/Jilli/126'><div>126</div></Link></td>
                        <td><Link to ='/Jilli/128'><div>128</div></Link></td>
                    </tr>
                    <tr>
                        <td><Link to ='/Jilli/101'><div>101</div></Link></td>
                        <td><Link to ='/Jilli/103'><div>103</div></Link></td>
                        <td><Link to ='/Jilli/105'><div>105</div></Link></td>
                        <td><Link to ='/Jilli/107'><div>107</div></Link></td>
                        <td><Link to ='/Jilli/109'><div>109</div></Link></td>
                        <td><Link to ='/Jilli/111'><div>111</div></Link></td>
                        <td><Link to ='/Jilli/113'><div>113</div></Link></td>
                        <td><Link to ='/Jilli/115'><div>115</div></Link></td>
                        <td><Link to ='/Jilli/117'><div>117</div></Link></td>
                        <td><Link to ='/Jilli/119'><div>119</div></Link></td>
                        <td><Link to ='/Jilli/121'><div>121</div></Link></td>
                        <td><Link to ='/Jilli/123'><div>123</div></Link></td>
                        <td><Link to ='/Jilli/125'><div>125</div></Link></td>
                        <td><Link to ='/Jilli/127'><div>127</div></Link></td>
                    </tr>
                    <tr>
                        <td><Link to ='/Jilli/102'><div>102</div></Link></td>
                        <td><Link to ='/Jilli/104'><div>104</div></Link></td>
                        <td><Link to ='/Jilli/106'><div>106</div></Link></td>
                        <td><Link to ='/Jilli/108'><div>108</div></Link></td>
                        <td><Link to ='/Jilli/110'><div>110</div></Link></td>
                        <td><Link to ='/Jilli/112'><div>112</div></Link></td>
                        <td><Link to ='/Jilli/114'><div>114</div></Link></td>
                    </tr>
                </table>
            </div>
            
            {viewContent.viewRoomNum === '' ? null : 
            <div className='roomMemo'>   
                <ul className='roomNavi'>
                    <li onClick={ ()=> setSwitchContent({ ...switchContent, switch: 'roomReply'})}> 방명록 </li>
                    <li onClick={roomChange}> 입퇴사 기간 체크</li> 
                </ul>

                {switchContent.switch === 'roomReply' ? 
                <div>   
                    <div className='roomTitle'> {viewContent.viewRoomNum} 게시판 </div>
                    {replyContent.map(element =>
                    <div>{element.text}</div>)}
                    <div className='input_button'>
                        <input value={postReplyContent.text} onChange={e => {
                            const {_, value} = e.target
                            setPostReplyContent({
                                ...postReplyContent,
                                text: value
                            })
                        }}></input>
                        <button onClick={postReply}>입력</button>
                    </div>
                </div> : 
                
                <div>
                    <div className='timeTable'>
                        <div className='timeBlock' onDragEnter={setColor(0)} style={{background: colorContent[0].color}}></div>
                        <div className='timeBlock' onDragEnter={setColor(1)} style={{background: colorContent[1].color}}></div>
                        <div className='timeBlock' onDragEnter={setColor(2)} style={{background: colorContent[2].color}}></div>
                        <div className='timeBlock' onDragEnter={setColor(3)} style={{background: colorContent[3].color}}></div>
                        <div className='timeBlock' onDragEnter={setColor(4)} style={{background: colorContent[4].color}}></div>
                        <div className='timeBlock' onDragEnter={setColor(5)} style={{background: colorContent[5].color}}></div>
                        <div className='timeBlock' onDragEnter={setColor(6)} style={{background: colorContent[6].color}}></div>
                        <div className='timeBlock' onDragEnter={setColor(7)} style={{background: colorContent[7].color}}></div>
                    </div>
                    
                    {showButton.show === true ? <button onClick={postRchange}>등록</button> : null}
                    
                </div>

                }
            </div>}
        </div>
    )
    
}

export default Jilli