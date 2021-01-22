import React from 'react';
import './App.css';
import Main from './Main';
import Sarang from './Sarang';

import { Link, Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route exact path = '/'><Main/></Route>
      <Route path='/Sarang'><Sarang/></Route>
    </Router>
  );
}

export default App;
