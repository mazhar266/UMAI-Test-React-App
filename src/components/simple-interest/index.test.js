import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedSimpleInterest from '.';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from '../../reducers';

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

const store = createStore(allReducers);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConnectedSimpleInterest store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calculates simple interest properly', () => {
  const enzymeWrapper = mount(<ConnectedSimpleInterest store={store}/>)
  // check the principal validation
  enzymeWrapper.find('#principal').simulate('change', { target: { value: '-100' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('h1').text()).toBe('Invalid Principal');

  // check the rate validation
  enzymeWrapper.find('#principal').simulate('change', { target: { value: '100' } });
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '-2' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('h1').text()).toBe('Invalid Rate');
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '101' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('h1').text()).toBe('Invalid Rate');

  // check the time validation
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '2' } });
  enzymeWrapper.find('#time').simulate('change', { target: { value: '-8' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('h1').text()).toBe('Invalid Time');

  // check the calculation
  enzymeWrapper.find('#time').simulate('change', { target: { value: '8' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('h1').text()).toBe('$ 116.00');
  // check again
  enzymeWrapper.find('#principal').simulate('change', { target: { value: '10000' } });
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '30' } });
  enzymeWrapper.find('#time').simulate('change', { target: { value: '10' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('h1').text()).toBe('$ 40000.00');
});
