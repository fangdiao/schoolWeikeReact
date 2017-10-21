import React from 'react';
import { hashHistory } from 'react-router';

import home from './home';
import details from './details';
import user from './user';
import login from './login';

import Frame from 'containers/Frame';
import Home from 'containers/Home';

let token = '';
if (localStorage.weike) {
  token = JSON.parse(localStorage.weike).token;
}

const checker = (nextState, replace, cb = () => {}) => {
  if (!token) {
    replace(`/login/loginIn`);
  }
};
const routes = {
  path: "/",
  indexRoute: {
    component: Home,
    onEnter: checker,
  },
  component: Frame,
  childRoutes: [
    home,
    details,
    user,
    login
  ]
}

export default routes;
