import React from 'react';
import ReactDOM from 'react-dom';
import SimpleInterest from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SimpleInterest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
