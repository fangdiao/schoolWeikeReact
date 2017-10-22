import LoginIn from 'containers/Login/LoginIn';
import Register from 'containers/Login/Register';
import ChangePW from 'containers/Login/ChangePW';

export default [
  {
    path: "loginIn",
    component: LoginIn,
  },
  {
    path: "register",
    component: Register,
  },
  {
    path: "changePW",
    component: ChangePW
  }
]