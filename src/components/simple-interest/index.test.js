import React from 'react';
import ReactDOM from 'react-dom';
import SimpleInterest from '.';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from '../../reducers';

const store = createStore(allReducers);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <SimpleInterest />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
