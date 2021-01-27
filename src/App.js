import Co_buying from './Co_buying/Co_buying'
import EachBuying from './Co_buying/EachBuying'
import Jilli from './Jilli'
import React from 'react';
import './style/App.css';
import Main from './Main';
import Sarang from './Sarang';
import Free from './Free';
import FreeWrite from './FreeWrite';
import FreeOne from './FreeOne';
import Login from './Login';
import Join from './Join';
import Jillimain from './Jillimain';
import User from './User';
import { withCookies, useCookies } from 'react-cookie';
import {useState, useEffect} from 'react';
import { Link, Route, BrowserRouter as Router , Redirect, Switch, withRouter} from 'react-router-dom'

function App(props) {

  const [ cookies, removeCookie ] = useCookies(['user']);
  const [ hasCookie, setHasCookie ] = useState(false);

  useEffect(() => {
    if (cookies.user && cookies.user !== 'undefined') {
    setHasCookie(true);
    }
  }, [ cookies ]);

  return (
    <Router>
      <Route exact path = '/User'><User {...props} removeCookie = {() => {removeCookie('user'); setHasCookie(false);}} ></User></Route>
      <Route exact path='/Co_buying'><Co_buying/></Route>
      <Route path='/Co_buying/:id'><EachBuying/></Route>
      <Route exact path='/Somang'><Jilli/></Route>
      <Route exact path = '/'><Main cookies = {cookies} hasCookie = {hasCookie} setHasCookie = {setHasCookie} removeCookie = {() => {removeCookie('user'); setHasCookie(false);}}/></Route>
      <Route path='/Sarang'><Sarang/></Route>
      {/* <Route exact path = '/Jilli'><Free/></Route>
      <Route exact path = '/Jilli/freeboardwrite'>{hasCookie?(<FreeWrite></FreeWrite>):(<Redirect to ={{pathname : "/Login"}}/>)}</Route>
      <Route exact path = '/Jilli/freeboardwrite/:freeid'><FreeOne></FreeOne></Route> */}
      {/* <Route exact path = '/Jilli'><Jillimain hasCookie = {hasCookie}/></Route> */}
      <Jillimain cookies = {cookies} hasCookie = {hasCookie} setHasCookie = {setHasCookie} removeCookie = {() => {removeCookie('user'); setHasCookie(false);}}/>
      <Route exact path = '/Login'><Login setHasCookie = {setHasCookie}></Login></Route>
      <Route exact path = '/Join'><Join></Join></Route>
    </Router>
  )
}

export default withCookies(App);
