import React from 'react';
import './App.css';
import Main from './Main';
import Sarang from './Sarang';
import ViewContent from './Co_buying/ViewContent'
import Jilli from './Jilli'

import { Link, Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route exact path = '/'><Main/></Route>
      <Route path='/Sarang'><Sarang/></Route>
      <Route path='/co_buying/:id'><ViewContent/></Route>
      <Route exact path='/Jilli'><Jilli/></Route>
    </Router>
  );
}

export default App;
