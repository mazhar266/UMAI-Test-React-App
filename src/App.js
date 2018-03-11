import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import './App.css';
import Header from './components/header';
import SimpleInterest from './components/simple-interest';
import CompoundInterest from './components/compound-interest';
import WelcomePage from './components/welcome-page';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <div className="App-intro">
            <Route exact path="/" component={WelcomePage}/>
            <Route path="/simple" component={SimpleInterest}/>
            <Route path="/compound" component={CompoundInterest}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
