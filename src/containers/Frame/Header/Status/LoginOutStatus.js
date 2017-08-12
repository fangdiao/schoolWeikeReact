import React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router'

import STYLE from './style';

export default class LoginOutStatus extends React.Component {
  render() {
    return (
      <Link className={STYLE.loginIcon} to="/login/loginIn">
        <span><Icon type="login" />登录</span>
      </Link>
    )
  }
}
