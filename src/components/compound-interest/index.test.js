import React from 'react';
import ReactDOM from 'react-dom';
import CompoundInterest from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CompoundInterest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
