import React from 'react';
import './App.css';
import Main from './Main';
import Sarang from './Sarang';
import Free from './Free';
import FreeWrite from './FreeWrite';
import FreeOne from './FreeOne';
import Login from './Login';
import Join from './Join';
import { withCookies, useCookies } from 'react-cookie';
import {useState, useEffect} from 'react';
import { Link, Route, BrowserRouter as Router , Redirect} from 'react-router-dom'

function App() {

  const [ cookies, removeCookie ] = useCookies(['user']);
  const [ hasCookie, setHasCookie ] = useState(false);

  useEffect(() => {
    if (cookies.user && cookies.user !== 'undefined') {
    setHasCookie(true);
    }
  }, [ cookies ]);

  return (
    <Router>
      <Route exact path = '/'><Main hasCookie = {hasCookie} setHasCookie = {setHasCookie} removeCookie = {() => {removeCookie('user'); setHasCookie(false);}}/></Route>
      <Route path='/Sarang'><Sarang/></Route>
      <Route exact path = '/Jilli'><Free/></Route>
      <Route exact path = '/Jilli/freeboardwrite'>{hasCookie?(<FreeWrite></FreeWrite>):(<Redirect to ={{pathname : "/Login"}}/>)}</Route>
      <Route exact path = '/Jilli/freeboardwrite/:freeid'><FreeOne></FreeOne></Route>
      <Route exact path = '/Login'><Login setHasCookie = {setHasCookie}></Login></Route>
      <Route exact path = '/Join'><Join></Join></Route>
    </Router>
  );
}

export default withCookies(App);
