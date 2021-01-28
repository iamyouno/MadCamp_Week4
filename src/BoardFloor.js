import React from 'react';
import {useParams, Link} from 'react-router-dom'

function BoardFloor(params) {

    var floor = useParams().floor
    return(
        <div>
            <div className='room'>
                <table>
                    <tr>
                        <td style={{fontSize: '24px'}}> {floor}F </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td rowSpan='3' className='hall'>HALL</td>
                        <td><div>{floor}16</div></td>
                        <td><div>{floor}18</div></td>
                        <td><div>{floor}20</div></td>
                        <td><div>{floor}22</div></td>
                        <td><div>{floor}24</div></td>
                        <td><div>{floor}26</div></td>
                        <td><div>{floor}28</div></td>
                    </tr>
                    <tr>
                        <td><div>{floor}01</div></td>
                        <td><div>{floor}03</div></td>
                        <td><div>{floor}05</div></td>
                        <td><div>{floor}07</div></td>
                        <td><div>{floor}09</div></td>
                        <td><div>{floor}11</div></td>
                        <td><div>{floor}13</div></td>
                        <td><div>{floor}15</div></td>
                        <td><div>{floor}17</div></td>
                        <td><div>{floor}19</div></td>
                        <td><div>{floor}21</div></td>
                        <td><div>{floor}23</div></td>
                        <td><div>{floor}25</div></td>
                        <td><div>{floor}27</div></td>
                    </tr>
                    <tr>
                        <td><div>{floor}02</div></td>
                        <td><div>{floor}04</div></td>
                        <td><div>{floor}06</div></td>
                        <td><div>{floor}08</div></td>
                        <td><div>{floor}10</div></td>
                        <td><div>{floor}12</div></td>
                        <td><div>{floor}14</div></td>
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

export default BoardFloor