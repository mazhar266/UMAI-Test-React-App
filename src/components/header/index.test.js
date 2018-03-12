import React from 'react';
import ReactDOM from 'react-dom';
import Header from '.';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <Header/>
    </Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
