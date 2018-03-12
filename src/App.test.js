import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('links are working', () => {
  const enzymeWrapper = mount(<App />)
  // check the welcome page
  expect(enzymeWrapper.find('h2').text()).toBe('Welcome to');

  // check the simple interest link
  enzymeWrapper.find('a.simple-link').simulate('click');
  setTimeout(() => {
    expect(enzymeWrapper.find('h2').text()).toBe('Simple Interest');
  }, 500);

  // check the compound interest link
  enzymeWrapper.find('a.compound-link').simulate('click');
  setTimeout(() => {
    expect(enzymeWrapper.find('h2').text()).toBe('Compound Interest');
  }, 500);
});
