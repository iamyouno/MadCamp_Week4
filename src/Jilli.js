import React, {useEffect, useState} from 'react'
import './Jilli.css'
import { Link, NavLink, Route, BrowserRouter as Router  } from 'react-router-dom';
import Axios from 'axios';
import JilliBoard from './JilliBoard'

function Jilli(params) {

    const [clkColor, setClkColor] = useState([{color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}, {color: '#8d8d8d'}])
    const [floorNum, setFloorNum] = useState('1F')
    return(
        <div className='body'>
            <div className='room'>

                <table>
                    <tr>
                        <td style={{fontSize: '24px'}}> {floorNum} </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td rowSpan='3'><div className = "hall">HALL</div></td>
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
            <div className='floor'>
                    <Link to ='/Jilli/board'><div className='eachFloor'>1F</div></Link>
                    <Link to ='/Jilli/board/floor/2'><div className='eachFloor'>2F</div></Link>
                    <Link to ='/Jilli/board/floor/3'><div className='eachFloor'>3F</div></Link>
                    <Link to ='/Jilli/board/floor/4'><div className='eachFloor'>4F</div></Link>
                    <Link to ='/Jilli/board/floor/5'><div className='eachFloor'>5F</div></Link>
                </div>
        </div>
    )
    
}

export default Jilli