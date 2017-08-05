import React from 'react';
import home from './home';
import details from './details';
import user from './user';
import login from './login';

import Frame from 'containers/Frame';
import Home from 'containers/Home';


let weike = localStorage.weike;

const cb = () => {};

const checker = (nextState, replace, cb) => {
  if (!weike) {
    replace({ nextPathname: '/login/loginIn' });
  }
};

const routes = {
  path: "/",
  onEnter: checker,
  indexRoute: {
    component: Home
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
