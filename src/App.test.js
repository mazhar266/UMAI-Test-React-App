import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';

const store = createStore(allReducers);

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('links are working', () => {
  const enzymeWrapper = mount(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  // check the welcome page
  expect(enzymeWrapper.find('h2').text()).toBe('Welcome to');

  // check the simple interest link
  enzymeWrapper.find('a.simple-link').simulate('click', { button: 0 });
  expect(enzymeWrapper.find('h2').text()).toBe('Simple Interest');

  // check the compound interest link
  enzymeWrapper.find('a.compound-link').simulate('click', { button: 0 });
  expect(enzymeWrapper.find('h2').text()).toBe('Compound Interest');
});
