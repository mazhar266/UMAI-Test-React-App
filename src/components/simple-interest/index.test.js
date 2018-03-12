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
  expect(enzymeWrapper.find('.alert').text()).toBe('Invalid Principal');

  // check the rate validation
  enzymeWrapper.find('#principal').simulate('change', { target: { value: '100' } });
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '-2' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('.alert').text()).toBe('Invalid Rate');
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '101' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('.alert').text()).toBe('Invalid Rate');

  // check the time validation
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '2' } });
  enzymeWrapper.find('#time').simulate('change', { target: { value: '-8' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('.alert').text()).toBe('Invalid Time');

  // check the calculation
  enzymeWrapper.find('#time').simulate('change', { target: { value: '8' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('.result-chart').html()).toBe('<div class="m-t-lg result-chart"><table width="100%"><thead><tr><th>Year</th><th>Interest</th><th class="align-right">Total</th></tr></thead><tbody><tr><td>1</td><td>2.00</td><td class="align-right">102.00</td></tr><tr><td>2</td><td>2.00</td><td class="align-right">104.00</td></tr><tr><td>3</td><td>2.00</td><td class="align-right">106.00</td></tr><tr><td>4</td><td>2.00</td><td class="align-right">108.00</td></tr><tr><td>5</td><td>2.00</td><td class="align-right">110.00</td></tr><tr><td>6</td><td>2.00</td><td class="align-right">112.00</td></tr><tr><td>7</td><td>2.00</td><td class="align-right">114.00</td></tr><tr><td>8</td><td>2.00</td><td class="align-right">116.00</td></tr></tbody></table></div>');
  // check again
  enzymeWrapper.find('#principal').simulate('change', { target: { value: '10000' } });
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '30' } });
  enzymeWrapper.find('#time').simulate('change', { target: { value: '10' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('.result-chart').html()).toBe('<div class="m-t-lg result-chart"><table width="100%"><thead><tr><th>Year</th><th>Interest</th><th class="align-right">Total</th></tr></thead><tbody><tr><td>1</td><td>3000.00</td><td class="align-right">13000.00</td></tr><tr><td>2</td><td>3000.00</td><td class="align-right">16000.00</td></tr><tr><td>3</td><td>3000.00</td><td class="align-right">19000.00</td></tr><tr><td>4</td><td>3000.00</td><td class="align-right">22000.00</td></tr><tr><td>5</td><td>3000.00</td><td class="align-right">25000.00</td></tr><tr><td>6</td><td>3000.00</td><td class="align-right">28000.00</td></tr><tr><td>7</td><td>3000.00</td><td class="align-right">31000.00</td></tr><tr><td>8</td><td>3000.00</td><td class="align-right">34000.00</td></tr><tr><td>9</td><td>3000.00</td><td class="align-right">37000.00</td></tr><tr><td>10</td><td>3000.00</td><td class="align-right">40000.00</td></tr></tbody></table></div>');
});
