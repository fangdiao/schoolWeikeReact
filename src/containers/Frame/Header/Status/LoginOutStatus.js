import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router'

import STYLE from './style';

export default class LoginOutStatus extends React.Component {
  render() {
    return (
      <div className={STYLE.loginIcon}>
        <Link to="/login/loginIn">
          <span><Icon type="login" />登录</span>
        </Link>
        <Link to="/login/register">
          <span><Icon type="user" />注册</span>
        </Link>
      </div>
    )
  }
}
