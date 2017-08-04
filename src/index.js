import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import { Router, hashHistory } from "react-router";
import reducers from './reducers';
import routes from './routes';

import 'layouts/less/common.less';

let store = createStore(reducers);
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
