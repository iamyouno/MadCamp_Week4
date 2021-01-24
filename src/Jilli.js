import React, {useEffect, useState} from 'react'
import './Jilli.css'
import { Link, NavLink } from 'react-router-dom';
import Axios from 'axios';

function Jilli(params) {


    const [viewContent, setViewContent] = useState({
        viewRoomNum: ''
    })

    const [replyContent, setReplyContent] = useState([])

    // useEffect(() => {
    //     Axios.get('http://192.249.18.168:8080/api/Jilli/'+'116').then((response)=>{
    //         setReplyContent(response.data)
    //     })
    // }, [replyContent])

    const [postReplyContent, setPostReplyContent] = useState({
        roomNum: '',
        text: ''
    })


    const roomMemo = (roomNum) => () => {
        setViewContent({
            ...viewContent,
            viewRoomNum: roomNum
        })

        setPostReplyContent({
            ...postReplyContent,
            roomNum: roomNum
        })

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
        })
            
        })
    }

    return(
        <div>
            <div className='room'>Jilli
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

            <div id='divRoomMemo' className='roomMemo' >
                {viewContent.viewRoomNum} 게시판
                
                {replyContent.map(element =>
                <div>{element.text}</div>)}

                <input onChange={e => {
                    const {_, value} = e.target
                    setPostReplyContent({
                        ...postReplyContent,
                        text: value
                    })
                    console.log(postReplyContent)
                }}></input>
                <button onClick={postReply}>입력</button>
                
            </div>
        </div>
    )
    
}

export default Jilli

// style={{display: 'none'}}