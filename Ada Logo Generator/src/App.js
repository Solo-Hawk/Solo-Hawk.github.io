import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Questions from './Questions';
import Logo from './Logo';

import './App.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Questions}/>
      <Route path="/logo/:answers" component={Logo}/>
    </div>
  </Router>
)

export default App;