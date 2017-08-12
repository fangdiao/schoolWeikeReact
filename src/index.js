import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { message } from 'antd';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { Router, hashHistory, browserHistory } from "react-router";

import reducers from './reducers';
import routes from './routes';

import 'layouts/less/common.less';

message.config({
  top: 100,
  duration: 3,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware, promiseMiddleware));
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
