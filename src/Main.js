import React from 'react';
import './style/btnStyle.css';
import { Link, Route, BrowserRouter as Router} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/icons/Person';
import {useEffect} from 'react';

function Main(props){
    useEffect(() => {
        if (props.cookies.user && props.cookies.user !== 'undefined') {
        props.setHasCookie(true);
        }
      }, [ props.cookies ]);

    return(
        <>
        <nav style = {{height: "80px"}}>
            <div class = "account-wrap">
                {!props.hasCookie && (
                <div class = "account">
                    <Link to = '/Login'>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Icon />}    
                        >로그인
                        </Button>
                    </Link>    
                </div>
                )}
                {props.hasCookie && (
                <div class = "account" >
                        <Button 
                            onClick = {props.removeCookie}
                            variant="outlined"
                            color="primary"
                            startIcon={<Icon />} 
                        >로그아웃</Button>  
                </div>
                )}
            </div>
        </nav>
        <div className="btn">
            <ul style={{listStyleType: 'none'}}>
                <table>
                    <tr>
                    <h1>KAIST Dormitory Community</h1>
                    </tr><tr>
                        <li style={{float: 'left'}}><Link to='/Co_buying'   style={{textDecoration: 'none' }} ><div>사랑</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Somang'   style={{textDecoration: 'none' }} ><div>소망</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Areum'    style={{textDecoration: 'none' }} ><div>아름</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Seongsil' style={{textDecoration: 'none' }} ><div>성실</div></Link></li>
                    </tr><tr>
                        <li style={{float: 'left'}}><Link to='/Jilli'    style={{textDecoration: 'none' }} ><div>진리</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Silloe'   style={{textDecoration: 'none' }} ><div>신뢰</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Jihey'    style={{textDecoration: 'none' }} ><div>지혜</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Sejong'   style={{textDecoration: 'none' }} ><div>세종</div></Link></li>
                    </tr><tr>
                        <li style={{float: 'left'}}><Link to='/Dasom'    style={{textDecoration: 'none' }} ><div>다솜</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Heemang'  style={{textDecoration: 'none' }} ><div>희망</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Mir'      style={{textDecoration: 'none' }} ><div>미르</div></Link></li>
                        <li style={{float: 'left'}}><Link to='/Narae'    style={{textDecoration: 'none' }} ><div>나래</div></Link></li>
                    </tr>
                </table>
            </ul>
        </div>
        </>
    );
}


export default Main;