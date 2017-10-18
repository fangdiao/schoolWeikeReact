import React from 'react';
import { Link } from 'react-router';
import { Button, message, Spin } from 'antd';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import RoleInput from 'components/FDInput/RoleInput';
import NameInput from 'components/FDInput/NameInput';
import ImgCodeInput from 'components/FDInput/ImgCodeInput';
import PWInput from 'components/FDInput/PWInput';

import STYLE from './style';

class LoginIn extends React.Component {

  state = {
    form: {
      username: '',
      password: '',
      verifyCode: '',
    },
    success: {
      username: false,
      password: false,
      verifyCode: false,
    },
    role: 'student',
    loading: false,
  };

  toParent = (value, success) => {
    let key = Object.keys(value)[0];
    if (key !== 'role') {
      this.setState({
        form: { ...this.state.form, ...value },
        success: { ...this.state.success, ...success },
      });
    } else {
      this.setState({ ...this.state, ...value });
    }
  };

  upForm = () => {
    let { form, success, role } = this.state;
    if (!_.findKey(success, item => item === false)) {
      this.setState({ loaing: true });
      let { actions: { studentLogin, teacherLogin }, data } = this.props;
      let { captchaCode } = data.login;
      let login = role === 'student' ? studentLogin : teacherLogin;
      login({ form, captchaCode }).then(r => {
        let { ifSuccess } = r.payload;
        if (!ifSuccess) {
          this.setState({ loading: false });
        }
      });
    } else {
      message.destroy();
      message.error('请正确填写个人信息');
    }
  };

  onChange = (e) => {
    this.setState({ role: e.target.value });
  };

  componentWillUnmount() {
    message.destroy();
  }

  render() {
    let { role, loading, success: { username, password } } = this.state;
    let imgCodeShow = username && password;
    return (
     <Spin spinning={loading}>
       <div className={STYLE.loginIn}>
         <h1>登录校园威客</h1>
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
       </div>
     </Spin>
    );
  }
}

export default connect(state => state, loginActions)(LoginIn);
