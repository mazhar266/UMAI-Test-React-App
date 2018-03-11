import React from 'react';
import ReactDOM from 'react-dom';
import WelcomePage from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WelcomePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
