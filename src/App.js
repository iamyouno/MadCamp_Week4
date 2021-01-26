import React from 'react'
import './App.css'
import Main from './Main'
import Co_buying from './Co_buying/Co_buying'
import EachBuying from './Co_buying/EachBuying'
import Jilli from './Jilli'

import { Link, Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route exact path = '/'><Main/></Route>
      <Route exact path='/Co_buying'><Co_buying/></Route>
      <Route path='/Co_buying/:id'><EachBuying/></Route>
      <Route exact path='/Jilli'><Jilli/></Route>
    </Router>
  )
}

export default App;
