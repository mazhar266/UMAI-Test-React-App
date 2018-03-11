import React from 'react';
import ReactDOM from 'react-dom';
import ComplexInterest from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ComplexInterest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
