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
  enzymeWrapper.find('#compound').simulate('change', { target: { value: '1' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('.result-chart').html()).toBe('<div class="m-t-lg result-chart"><table width="100%"><thead><tr><th>Year</th><th>Interest</th><th class="align-right">Total</th></tr></thead><tbody><tr><td>1</td><td>2.00</td><td class="align-right">102.00</td></tr><tr><td>2</td><td>2.04</td><td class="align-right">104.04</td></tr><tr><td>3</td><td>2.08</td><td class="align-right">106.12</td></tr><tr><td>4</td><td>2.12</td><td class="align-right">108.24</td></tr><tr><td>5</td><td>2.16</td><td class="align-right">110.41</td></tr><tr><td>6</td><td>2.21</td><td class="align-right">112.62</td></tr><tr><td>7</td><td>2.25</td><td class="align-right">114.87</td></tr><tr><td>8</td><td>2.30</td><td class="align-right">117.17</td></tr></tbody></table></div>');
  // check again
  enzymeWrapper.find('#principal').simulate('change', { target: { value: '10000' } });
  enzymeWrapper.find('#rate').simulate('change', { target: { value: '30' } });
  enzymeWrapper.find('#time').simulate('change', { target: { value: '10' } });
  enzymeWrapper.find('button').simulate('submit');
  expect(enzymeWrapper.find('.result-chart').html()).toBe('<div class=\"m-t-lg result-chart\"><table width=\"100%\"><thead><tr><th>Year</th><th>Interest</th><th class=\"align-right\">Total</th></tr></thead><tbody><tr><td>1</td><td>3000.00</td><td class=\"align-right\">13000.00</td></tr><tr><td>2</td><td>3900.00</td><td class=\"align-right\">16900.00</td></tr><tr><td>3</td><td>5070.00</td><td class=\"align-right\">21970.00</td></tr><tr><td>4</td><td>6591.00</td><td class=\"align-right\">28561.00</td></tr><tr><td>5</td><td>8568.30</td><td class=\"align-right\">37129.30</td></tr><tr><td>6</td><td>11138.79</td><td class=\"align-right\">48268.09</td></tr><tr><td>7</td><td>14480.43</td><td class=\"align-right\">62748.52</td></tr><tr><td>8</td><td>18824.56</td><td class=\"align-right\">81573.07</td></tr><tr><td>9</td><td>24471.92</td><td class=\"align-right\">106044.99</td></tr><tr><td>10</td><td>31813.50</td><td class=\"align-right\">137858.49</td></tr></tbody></table></div>');
});
