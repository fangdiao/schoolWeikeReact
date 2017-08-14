import React from 'react';
import { Link } from 'react-router';
import { Icon, Button, message, Radio } from 'antd';
import _ from 'lodash';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import NameInput from 'components/FDInput/NameInput';
import PWInput from 'components/FDInput/PWInput';
import MailCodeInput from 'components/FDInput/MailCodeInput';
import MailInput from 'components/FDInput/MailInput';



const RadioGroup = Radio.Group;

import STYLE from './style';

class Register extends React.Component {

  state = {
    form: {
      role: 'student',
      username: '',
      mail: '',
      mailCode: '',
      password: ''
    },
    success: {
      username: false,
      mail: false,
      mailCode: false,
      password: false
    }
  }

  toParent = (value, success) => {
    let key = Object.keys(value)[0]
    this.setState({
      form: { ...this.state.form, ...value },
      success: { ...this.state.success, ...success }
    });
  }



  changeRole = (e) => {
    this.setState((prevstate) => ({
      form: {
        ...this.state.form,
        role: prevstate.form.role === 'student' ? 'teacher' : 'student'
      }
    }));
  }

  upForm = () => {
    let form = this.state.form;
    let success = this.state.success;
    if (!_.findKey(success, (item) => item === false)) {
      let { actions } = this.props;
      form.role === 'student' ? actions.studentRegister(form) : actions.teacherRegister(form);
    } else {
      message.destroy();
      message.error('请正确填写个人信息');
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    message.destroy();
  }

  render() {
    let { form, success } = this.state;
    return (
      <div className={STYLE.register}>
        <h1>嘿,gay们</h1>
        <form>
          <div className={STYLE.role}>
            <RadioGroup onChange={this.changeRole} value={form.role}>
              <Radio value="student">学生</Radio>
              <Radio value="teacher">老师</Radio>
            </RadioGroup>
          </div>
          <NameInput toParent={this.toParent} />
          <MailInput toParent={this.toParent} />
          <MailCodeInput
            mail={form.mail}
            toParent={this.toParent}
            height={success.mail && success.username }
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
    )
  }
}

export default connect(state => state.login, loginActions)(Register);
