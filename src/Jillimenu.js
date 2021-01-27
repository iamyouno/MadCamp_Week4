import React from 'react';
import { withCookies, useCookies } from 'react-cookie';
import {useState, useEffect} from 'react';
import { Link, Route, BrowserRouter as Router , Redirect, Switch, NavLink} from 'react-router-dom'
import './style/Jillimenu.css'
import 'semantic-ui-css/semantic.min.css';
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/icons/Person';

function Jillimenu(props) {

//   const [ cookies, removeCookie ] = useCookies(['user']);
//   const [ hasCookie, setHasCookie ] = useState(false);

//   useEffect(() => {
//     if (cookies.user && cookies.user !== 'undefined') {
//     setHasCookie(true);
//     }
//   }, [ cookies ]);

  return (
    <nav>
        <div className = "Jillimenuwrap">
            {!props.hasCookie && (
                <div class = "Jillimenuaccount">
                    <Link to = '/Login'>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Icon />}    
                        ><h3 style ={{fontSize: "17px", marginTop : "0px"}}>Login</h3>
                        </Button>
                    </Link>    
                </div>
                )}
                {props.hasCookie && (
                <div class = "Jillimenuaccount" >
                        <Link to = '/User'>
                            <Button
                                className = "my" 
                                variant="outlined"
                                color="primary"
                                style ={{width: "33px"}}
                                startIcon={<Icon style ={{marginLeft: "-4.5px"}}></Icon>} 
                            ></Button>
                        </Link> 
                        <Button 
                            onClick = {props.removeCookie}
                            variant="outlined"
                            color="primary"
                        ><h3 style ={{fontSize: "17px"}}>Logout</h3></Button>  
                </div>
                )}
            <ul className = "Jillimenumenu">
                <li>
                    <NavLink exact path to ="/" className ="JillimenuNavlink">메인</NavLink>
                </li>
                <li>
                    <NavLink exact path to ="/Jilli/board" className ="JillimenuNavlink">진리관 게시판</NavLink>
                </li>
                <li>
                    <NavLink exact path to ="/Jilli/freeboard" className ="JillimenuNavlink" >진리관 자유 게시판</NavLink>
                </li>
                <li>
                    <NavLink exact path to ="/Jilli/Co-buying" className ="JillimenuNavlink">공동 구매</NavLink>
                </li>    
            </ul> 
        </div>
    </nav>
  )
}

export default Jillimenu;
