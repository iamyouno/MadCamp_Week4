import React, {useEffect, useState} from 'react'
import './Jilli.css'
import { Link, NavLink, Route, BrowserRouter as Router  } from 'react-router-dom';
import Axios from 'axios';
import JilliBoard from './JilliBoard'

function Jilli(params) {

    // const [viewContent, setViewContent] = useState({
    //     viewRoomNum: ''
    // })

    // const [postReplyContent, setPostReplyContent] = useState({
    //     roomNum: '',
    //     text: ''
    // })

    // const [replyContent, setReplyContent] = useState([])

    // const [switchContent, setSwitchContent] = useState({
    //     switch: 'roomReply'
    // })

    // const [colorContent, setColorContent] = useState([
    //     {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}, {color: '#FFFFFF'}
    // ])

    // const [showButton, setShowButton] = useState({
    //     show: true
    // })

    const [clkColor, setClkColor] = useState([{color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}])

    // const setColor = (num) => () => {
    //     if (showButton.show == true ){
    //         var list = [...colorContent]
    //         list[num] = {color: '#3f51b5'}
    //         setColorContent(list)
    //     }
    // }

    // const setColorBlue = (num) => () => {
    //     if (showButton.show == true ){
    //         var list = [...colorContent]
    //         list[num] = {color: '#FFFFFF'}
    //         setColorContent(list)
    //     }
    // }

    // const toggleColor = (num) => () => {
    //     // console.log(colorContent[num].color)
    //     if (colorContent[num].color == '#FFFFFF') {
    //         console.log('eihiehi')
    //         setColor(num)();
    //     }
    //     else {
    //         console.log('why')
    //         var list = [...colorContent]
    //         list[num] = {color: '#FFFFFF'}
    //         setColorContent(list)

    //     }
    //     console.log(colorContent[num].color)
    // }

    // // useEffect(() => {}, [colorContent])

    // const roomMemo = (roomNum) => () => {
    //     // setViewContent({
    //     //     ...viewContent,
    //     //     viewRoomNum: roomNum
    //     // })

    //     // setPostReplyContent({
    //     //     ...postReplyContent,
    //     //     roomNum: roomNum
    //     // })

    //     // setSwitchContent({
    //     //     ...switchContent,
    //     //     switch: 'roomReply'
    //     // })

    //     // setColorContent([
    //     //     {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}, {color: '#0000000'}
    //     // ])

    //     // Axios.get('http://192.249.18.168:8080/api/Jilli/'+roomNum).then((response)=>{
    //     //     setReplyContent(response.data)
    //     // })

    //     // if (roomNum == 116)
    //     //     setClkColor([{color: '#004193'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}])
    //     // else if (roomNum == 118)
    //     //     setClkColor([{color: '#8d8d8d'}, {color: '#004193'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}])
    //     // else if (roomNum == 120)
    //     //     setClkColor([{color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#004193'}, {color: '#8d8d8d'}])
    //     // else if (roomNum == 122)
    //     //     setClkColor([{color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#004193'}])
    //     // <Link to = '/Jilli/board/'+roomNum/>
    // }

    // const postReply = () => {
    //     Axios.post('http://192.249.18.168:8080/api/Jilli/'+postReplyContent.roomNum, {
    //         roomNum: postReplyContent.roomNum,
    //         text: postReplyContent.text
    //     }).then(function (response) {
    //         console.log("response")
    //         Axios.get('http://192.249.18.168:8080/api/Jilli/'+postReplyContent.roomNum).then((response)=>{
    //         setReplyContent(response.data)
    //         setPostReplyContent({
    //             ...postReplyContent,
    //             text: ''
    //         })

    //     })
    //     })
    // }

    // const postRchange = () => {
    //     var list = []
    //     var index = 0
    //     colorContent.map(element => {
    //         if (element.color === '#d39ebb') {list.push(index)}
    //         index ++
    //     })

    //     Axios.post('http://192.249.18.168:8080/api/Jilli/rchange/'+postReplyContent.roomNum, {
    //         roomNum: postReplyContent.roomNum,
    //         select: colorContent
    //     }).then(function (response) {
    //         console.log("response rchange")
            
    //     })
    // }

    // const roomChange = ()=> {
    //     setSwitchContent({ ...switchContent, switch: 'roomChange'})
    //     Axios.get('http://192.249.18.168:8080/api/Jilli/rchange/'+postReplyContent.roomNum).then((response) =>{
    //         console.log(response.data.length)
    //         if (response.data.length != 0) { 
    //             console.log(response.data[response.data.length-1].select)
    //             setColorContent(response.data[response.data.length-1].select)
    //             setShowButton({show: false})
    //             console.log(showButton) }
    //         else{
    //             setShowButton({show: true})
    //         }      
    //     })
    // }

    // const chooseColor = (num) => () => {
    //     if (num == 0)
    //         setClkColor([{color: '#004193'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}])
    //     else if (num == 1)
    //         setClkColor([{color: '#8d8d8d'}, {color: '#004193'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}])
    //     else if (num == 2)
    //         setClkColor([{color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#004193'}, {color: '#8d8d8d'}])
    //     else if (num == 3)
    //         setClkColor([{color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#004193'}])

    //     console.log(clkColor)
    // }
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
                        <td><NavLink to ={'/Jilli/board/'+'116'}><div>116</div></NavLink></td>
                        <td><NavLink to ={'/Jilli/board/'+'118'}><div>118</div></NavLink></td>
                        <td><NavLink to ={'/Jilli/board/'+'120'}><div>120</div></NavLink></td>
                        <td><NavLink to ={'/Jilli/board/'+'122'}><div>122</div></NavLink></td>
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
            {/* <div className='floor'>
                <div className='eachFloor'>1F</div>
                <div className='eachFloor'>2F</div>
                <div className='eachFloor'>3F</div>
                <div className='eachFloor'>4F</div>
                <div className='eachFloor'>5F</div>
            </div> */}
        </div>
    )
    
}

export default Jilli