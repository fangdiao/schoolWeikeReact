import React from 'react';
import { Link, hashHistory } from 'react-router';
import { Button, message, Spin } from 'antd';
import _ from 'lodash';

import { connect, jump } from 'utils/helper';
import loginActions from 'actions/login';

import RoleInput from 'components/FDInput/RoleInput';
import NameInput from 'components/FDInput/NameInput';
import PWInput from 'components/FDInput/PWInput';
import MailCodeInput from 'components/FDInput/MailCodeInput';
import MailInput from 'components/FDInput/MailInput';

import STYLE from './style';

class Register extends React.Component {

  state = {
    form: {
      username: '',
      email: '',
      verifyCode: '',
      password: '',
    },
    success: {
      username: false,
      email: false,
      verifyCode: false,
      password: false,
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
    let { form: { username, password, verifyCode, email }, success, role } = this.state;
    if (!_.findKey(success, item => item === false)) {
      let { actions } = this.props;
      this.setState({ loading: true });
      if (role === 'student') {
        let studentInfo = { username, password, email };
        let form = { verifyCode, studentInfo };
        actions.studentRegister(form).then(r => {
          this.setState({ loading: false });
          if (r.payload.ifSuccess) {
            message.success('注册成功请登录');
            hashHistory.push('/login/loginIn');
          }
        });
      } else {
        let teacherInfo = { username, password, email };
        let form = { verifyCode, teacherInfo };
        actions.teacherRegister(form).then(r => {
          this.setState({ loading: false });
          if (r.payload.ifSuccess) {
            jump(`/login/loginIn`, `注册成功请登录`);
          }
        });
      }
    } else {
      message.destroy();
      message.error('请正确填写个人信息');
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
    message.destroy();
  }

  render() {
    let { form, success, role, loading } = this.state;
    return (
      <Spin spinning={loading}>
        <div className={STYLE.register}>
          <h1>欢迎来到校园威客</h1>
          <form>
            <RoleInput role={role} toParent={this.toParent} />
            <NameInput toParent={this.toParent} />
            <MailInput toParent={this.toParent} />
            <MailCodeInput
              role={form.role}
              username={form.username}
              email={form.email}
              toParent={this.toParent}
              height={success.email && success.username }
            />
            <PWInput toParent={this.toParent} />
            <div className={STYLE.button}>
              <Button type="primary" htmlType="submit" onClick={this.upForm}>注册</Button>
            </div>
          </form>
          <span>
          <Link to="/login/loginIn">已有账号？去登录</Link>
        </span>
        </div>
      </Spin>
    );
  }
}

export default connect(state => state.login, loginActions)(Register);
