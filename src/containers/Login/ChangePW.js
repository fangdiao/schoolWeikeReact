import React from 'react';
import { Icon, Button, message } from 'antd';
import _ from 'lodash';

import RoleInput from 'components/FDInput/RoleInput';
import NameInput from 'components/FDInput/NameInput';
import MailInput from 'components/FDInput/MailInput';
import MailCodeInput from 'components/FDInput/MailCodeInput';
import PWInput from 'components/FDInput/PWInput';
import FDLoadingWrapper from 'components/FDLoadingWrapper';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

class ChangePW extends React.Component {

  state = {
    form: {
      username: '',
      email: '',
      verifyCode: '',
      password: '',
      newPassword: '',
    },
    success: {
      username: false,
      email: false,
      verifyCode: false,
      password: false,
      newPassword: false,
    },
    role: 'student',
    ifSuccess: false,
  }

  toParent = (value, success) => {
    let key = Object.keys(value)[0];
    if (key !== 'role') {
      this.setState({
        form: { ...this.state.form, ...value },
        success: { ...this.state.success, ...success }
      });
    } else {
      this.setState({ ...this.state, ...value });
    }
  }

  upPW = () => {
    let { form: { password, newPassword, username, verifyCode }, success, role } = this.state;
    if (!_.filter(success, item => item === false).length) {
      if (password === newPassword) {
        this.setState({ ifSuccess: true });
        let { actions } = this.props;
        let form = { password, username, verifyCode };
        if (role === 'student') {
          actions.studentChangePW(form).then(() => this.setState({ ifSuccess: false }));
        } else {
          actions.teacherChangePW(form).then(() => this.setState({ ifSuccess: false }));
        }
      } else {
        message.destroy();
        message.error('两次密码必须相同');
      }
    } else {
      message.destroy();
      message.error('请正确填写个人信息');
    }

  }

  render() {
    let { form, success: { username, email, verifyCode }, role, ifSuccess } = this.state;
    let style = username && email && verifyCode ? {"height": "120px"} : {"height": "0","overflow": "hidden"};
    return (
      <div className={STYLE.changePW}>
        <h1>修改密码</h1>
        <form>
          <RoleInput role={role} toParent={this.toParent}  />
          <NameInput toParent={this.toParent}  />
          <MailInput toParent={this.toParent} />
          <MailCodeInput
            role={role}
            username={form.username}
            email={form.email}
            toParent={this.toParent}
            height={email&&username}
            type="password"
          />
          <div style={style}>
            <PWInput placeholder="新密码" type="password" ref={ele => this.password = ele} toParent={this.toParent} />
            <PWInput type="newPassword" ref={ele => this.newPassword = ele} placeholder="确认密码" toParent={this.toParent} />
          </div>
          <div className={STYLE.button}>
            <Button type="primary" htmlType="submit" onClick={this.upPW}>提交</Button>
          </div>
        </form>
        {
          ifSuccess ? <FDLoadingWrapper tip="正在提交..."/> : null
        }
      </div>
    )
  }
}
export default connect(state => state.login, loginActions)(ChangePW);
