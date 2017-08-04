import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from 'containers/Home';
import User from 'containers/User';

import StudentDetails from 'containers/Details/StudentDetails'
import TeacherDetails from 'containers/Details/TeacherDetails'
import LoginIn from 'containers/Login/LoginIn';
import LoginOut from 'containers/Login/LoginOut';
import Register from 'containers/Login/Register';
import ChangePW from 'containers/Login/ChangePW';

//登录界面路由

const loginRoutes = [
  {
    path: "/login/loginIn",
    component: LoginIn,
  },
  {
    path: "/login/loginOut",
    component: LoginOut
  },
  {
    path: "/login/register",
    component: Register,
  },
  {
    path: "/login/changePW",
    component: ChangePW
  }
];

//详情填写界面路由

const detailsRoutes = [
  {
    path: "/details/studentDetails",
    component: StudentDetails
  },
  {
    path: "/details/teacherDetails",
    component: TeacherDetails
  }
];

const routes = {
  path: "/",
  onEnter: () => {},
  childRoutes: [
    {
      path: "/login",
      indexRoute: {
        component: LoginIn
      },
      childRoutes: loginRoutes
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/user",
      component: User
    },
    {
      path: "/details",
      childRoutes: detailsRoutes
    }
  ]
}

export default routes;
