import React from 'react';
import './App.css';
import Main from './Main';
import Sarang from './Sarang';
import ViewContent from './Co_buying/ViewContent'

import { Link, Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route exact path = '/'><Main/></Route>
      <Route path='/Sarang'><Sarang/></Route>
      <Route path='/co_buying/:id'><ViewContent/></Route>
    </Router>
  );
}

export default App;
