import LoginIn from 'containers/Login/LoginIn';
import LoginOut from 'containers/Login/LoginOut';
import Register from 'containers/Login/Register';
import ChangePW from 'containers/Login/ChangePW';

export default {
  path: "/login",
  indexRoute: {
    component: LoginIn
  },
  childRoutes:  [
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
  ]
}
