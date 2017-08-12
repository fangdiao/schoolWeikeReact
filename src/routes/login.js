import Login from 'containers/Login';
import LoginIn from 'containers/Login/LoginIn';
import Register from 'containers/Login/Register';
import ChangePW from 'containers/Login/ChangePW';

export default {
  path: "/login",
  component: Login,
  indexRoute: {
    component: LoginIn
  },
  childRoutes:  [
    {
      path: "/login/loginIn",
      component: LoginIn,
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
