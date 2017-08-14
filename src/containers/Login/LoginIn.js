import React from 'react';
import { Link } from 'react-router';
import { Icon, Button, message } from 'antd';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import NameInput from 'components/FDInput/NameInput';
import ImgCodeInput from 'components/FDInput/ImgCodeInput';
import PWInput from 'components/FDInput/PWInput';

import STYLE from './style';

class LoginIn extends React.Component {

  state = {
    form: {
      username: '',
      password: '',
      imgCode: ''
    },
    success: {
      username: false,
      password: false,
      imgCode: false
    }
  }

  toParent = (value, success) => {
    let key = Object.keys(value)[0]
    this.setState({
      form: { ...this.state.form, ...value },
      success: { ...this.state.success, ...success }
    });
  }

  upForm = () => {
    let { form, success } = this.state;
    if (!_.findKey(success, item => item === false)) {
      let { actions } = this.props;
      actions.login(form);
    } else {
      message.destroy();
      message.error('请正确填写个人信息');
    }
  }

  componentWillUnmount() {
    message.destroy();
  }

  render() {
    let { login } = this.props.data;
    let imgCodeShow = this.state.success.username && this.state.success.password;
    return (
      <div className={STYLE.loginIn}>
        <h1>嘿,gay</h1>
        <form>
          <NameInput toParent={this.toParent} />
          <PWInput toParent={this.toParent} />
          <ImgCodeInput height={imgCodeShow} toParent={this.toParent} />
          <div className={STYLE.button}>
            <Button type="primary" htmlType="submit" onClick={this.upForm}>登录</Button>
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
