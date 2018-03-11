import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import './App.css';
import Header from './components/header';
import SimpleInterest from './components/simple-interest';
import ComplexInterest from './components/complex-interest';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <div className="App-intro">
            <Route exact path="/" component={SimpleInterest}/>
            <Route path="/complex" component={ComplexInterest}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
