import React from 'react';
import { Link } from 'react-router';
import { Icon, Button, message, Radio } from 'antd';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import RoleInput from 'components/FDInput/RoleInput';
import NameInput from 'components/FDInput/NameInput';
import ImgCodeInput from 'components/FDInput/ImgCodeInput';
import PWInput from 'components/FDInput/PWInput';
import FDLoadingWrapper from 'components/FDLoadingWrapper';
import STYLE from './style';

const RadioGroup = Radio.Group;

class LoginIn extends React.Component {

  state = {
    form: {
      username: '',
      password: '',
      verifyCode: ''
    },
    success: {
      username: false,
      password: false,
      verifyCode: false
    },
    role: 'student',
    ifSuccess: false
  }

  toParent = (value, success) => {
    let key = Object.keys(value)[0]
    if (key !== 'role') {
      this.setState({
        form: { ...this.state.form, ...value },
        success: { ...this.state.success, ...success }
      });
    } else {
      this.setState({ ...this.state, ...value });
    }
  }

  upForm = () => {
    let { form, success, role } = this.state;
    if (!_.findKey(success, item => item === false)) {
      this.setState({ ifSuccess: true });
      let { actions, data } = this.props;
      let { captchaCode } = data.login;
      role === 'student' ?
      actions.studentLogin({ form ,captchaCode }).then(() => this.setState({ ifSuccess: false })) :
      actions.teacherLogin({ form ,captchaCode }).then(() => this.setState({ ifSuccess: false }));
    } else {
      message.destroy();
      message.error('请正确填写个人信息');
    }
  }

  onChange = (e) => {
    this.setState({ role: e.target.value });
  }

  componentWillUnmount() {
    message.destroy();
  }

  render() {
    let { role, ifSuccess } = this.state;
    let { login } = this.props.data;
    let imgCodeShow = this.state.success.username && this.state.success.password;
    return (
      <div className={STYLE.loginIn}>
        <h1>我的小可爱</h1>
        <form>
          <RoleInput role={role} toParent={this.toParent} />
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
        {
          ifSuccess ? <FDLoadingWrapper tip="正在登录..."/> : null
        }
      </div>
    )
  }
}

export default connect(state => state, loginActions)(LoginIn);
