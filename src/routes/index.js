import React from 'react';

import details from './details';

import User from 'containers/User';
import Login from 'containers/Login';
import Frame from 'containers/Frame';
import Home from 'containers/Home';


const onEnter = ({}, replace) => {
  if (!!localStorage.weike) {
    replace(`/dist`);
  } else {
    replace(`/login/loginIn`);
  }
}


const routesWrapper = routers => {

  const checker = ({}, replace) => {
    if (!!!localStorage.weike) {
      replace('/login/loginIn');
    }
  }

  const loginChecker = ({}, replace) => {
    if (localStorage.weike) {
      replace('/dist');
    }
  }

  return routers.map(router => {
    const onEnter = router.path === '/login' ? loginChecker : checker;
      let defaultRouter = {
        components: Frame,
        onEnter: onEnter,
        getChildRoutes: (partialNextState, callback) => {
          router.childRoutesLoader(module => {
            callback(null, module.default.map(childRoute => {
              return Object.assign(childRoute, { onEnter:onEnter } );
            }));
          });
        }
      };
    return Object.assign(defaultRouter, router);
  });
};

const routes = {
  path: "/",
  indexRoute: {
    component: Home,
    onEnter: onEnter,
  },
  component: Frame,
  childRoutes: routesWrapper([
    {
      path: "/dist",
      component: Home,
      indexRoute: {
        component: Home,
      },
      childRoutesLoader: cb => require.ensure([], require => cb(require('./dist')), 'dist'),
    },
    {
      path: "/user",
      component: User,
      indexPath: '/user/info',
      childRoutesLoader: cb => require.ensure([], require => cb(require('./user')), 'user'),
    },
    {
      path: "/login",
      component: Login,
      childRoutesLoader: cb => require.ensure([], require => cb(require('./login')), 'login'),
    },
    details,
  ])
}

export default routes;
