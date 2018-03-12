import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedCompoundInterest from '.';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from '../../reducers';

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

const store = createStore(allReducers);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ConnectedCompoundInterest store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calculates compound interest properly', () => {
  const enzymeWrapper = mount(<ConnectedCompoundInterest store={store}/>)
  enzymeWrapper.find('#principal').simulate('change', { target: { value: '100' } });
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '2' } });
  enzymeWrapper.find('#time').simulate('change', { target: { value: '8' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('h1').text()).toBe('$ 117.17');
});
