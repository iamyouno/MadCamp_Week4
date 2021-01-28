import Co_buying from './Co_buying/Co_buying'
import EachBuying from './Co_buying/EachBuying'
import Jilli from './Jilli'
import React from 'react';
import './style/App.css';
import Free from './Free';
import FreeWrite from './FreeWrite';
import FreeOne from './FreeOne';
import Jillimenu from './Jillimenu';
import BoardFloor from './BoardFloor';
import { withCookies, useCookies } from 'react-cookie';
import {useState, useEffect} from 'react';
import { Link, Route, BrowserRouter as Router , Redirect, Switch} from 'react-router-dom'

function Jillimain(props) {

//   const [ cookies, removeCookie ] = useCookies(['user']);
//   const [ hasCookie, setHasCookie ] = useState(false);

//   useEffect(() => {
//     if (cookies.user && cookies.user !== 'undefined') {
//     setHasCookie(true);
//     }
//   }, [ cookies ]);

  return (
    <>
      {/* <Route exact path='/Co_buying'><Co_buying/></Route>
      <Route path='/Co_buying/:id'><EachBuying/></Route> */}
      {/* <Route exact path='/Somang'><Jilli/></Route>
      <Route exact path = '/'><Main cookies = {cookies} hasCookie = {hasCookie} setHasCookie = {setHasCookie} removeCookie = {() => {removeCookie('user'); setHasCookie(false);}}/></Route>
      <Route path='/Sarang'><Sarang/></Route> */}
      <Route path = '/Jilli'><Jillimenu cookies = {props.cookies} hasCookie = {props.hasCookie} setHasCookie = {props.setHasCookie} removeCookie = {() => {props.removeCookie('user'); props.setHasCookie(false);}}></Jillimenu></Route>
      <Route exact path = '/Jilli/board'><Jilli/></Route>
      <Route exact path='/Jilli/Co_buying/:id'><EachBuying/></Route>

      <Route exact path = '/Jilli/board/floor/:floor'><BoardFloor/></Route>

      <Route exact path = '/Jilli/Co-buying'><Co_buying/></Route>
      <Route exact path = '/Jilli/freeboard'><Free/></Route>
      <Route exact path = '/Jilli/freeboard/write'>{props.hasCookie?(<FreeWrite></FreeWrite>):(<Redirect to ={{pathname : "/Login"}}/>)}</Route>
      <Route exact path = '/Jilli/freeboard/write/:freeid'><FreeOne></FreeOne></Route>
      {/* <Route exact path = '/Login'><Login setHasCookie = {setHasCookie}></Login></Route>
      <Route exact path = '/Join'><Join></Join></Route> */}
    </>
  )
}

export default Jillimain;
