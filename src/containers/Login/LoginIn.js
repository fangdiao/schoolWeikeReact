import React from 'react';
import { Link } from 'react-router';
import { Icon, Button } from 'antd';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

class LoginIn extends React.Component {

  upForm = (e) => {
    e.preventDefault();
    let username = this.username;
    let password = this.password;
    if (username && password) {
      let { actions } = this.props;
      actions.studentLogin({
        username,
        password
      })
    }
  }

  render() {
    return (
      <div className={STYLE.loginIn}>
        <div>
          <h1>嘿,gay</h1>
        </div>
        <form>
          <div>
            <input
              ref={(ele) => {this.username = ele}}
              type="text"
              placeholder="用户名"
              autoFocus
            />
          </div>
          <div>
            <input
              ref={(ele) => {this.password = ele}}
              type="password"
              placeholder="密码"
            />
          </div>
          <div>
            <input
              ref={(ele) => {this.username = ele}}
              type="text"
              placeholder="验证码"
            />
          </div>
          <div className={STYLE.button}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.upForm}
            >登录</Button>
          </div>
        </form>
        <span>
          <Link to="/login/changePW">忘记密码?</Link>
          <Link to="/login/register">去注册</Link>
        </span>
      </div>
    )
  }
}

export default connect(state => state, loginActions)(LoginIn);
