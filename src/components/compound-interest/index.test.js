import React from 'react';
import ReactDOM from 'react-dom';
import CompoundInterest from '.';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from '../../reducers';

const store = createStore(allReducers);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <CompoundInterest />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
