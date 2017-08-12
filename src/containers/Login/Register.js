import React from 'react';
import { Link } from 'react-router';
import { Icon, Button, message, Radio } from 'antd';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

const RadioGroup = Radio.Group;

import STYLE from './style';

class Register extends React.Component {

  state = {
    form: {
      role: 'student',
      username: '',
      email: '',
      password: ''
    },
    err: {
      username: false,
      email: false,
      password: false
    },
    passwordShow: false,
    countdown: 60,
    canSubmit: false
  }

  getCode = () => {

    if (this.state.err.email) {
      let { actions } = this.props;
      actions.getEmailCode({
        email: 'ff@ds.com'
      });

      const countdown = () => {
        this.setState((prevstate) => {
          if (prevstate.countdown === 0) {
            clearInterval(this.timer);
            return { countdown: 60 }
          } else {
            return { countdown: -- prevstate.countdown }
          }
        });
      }
      countdown();
      this.timer = setInterval(countdown, 1000);
    } else {
      message.info('请填写正确的邮箱');
    }
  }

  changeRole = (e) => {
    this.setState((prevstate) => ({
      form: {
        ...this.state.form,
        role: prevstate.form.role === 'student' ? 'teacher' : 'student'
      }
    }));
  }

  changeUsername = (e) => {
    let text = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        username: text
      },
      err: {
        ...this.state.err,
        username: text ? false : true
      }
    });
  }

  changeEmail = (e) => {
    let text = e.target.value;
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    this.setState({
      form: {
        ...this.state.form,
        email: text
      },
      err: {
        ...this.state.err,
        email: !reg.test(text)
      }
    });
  }

  changeCode = (e) => {
    let text = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        code: text
      },
      err: {
        ...this.state.err,
        code: text.length < 6 ? true : false
      }
    });
  }

  changePassword = (e) => {
    let text = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        password: text
      },
      err: {
        ...this.state.err,
        password: text.length < 6 ? true : false
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    message.destroy();
  }

  render() {
    return (
      <div className={STYLE.register}>
        <div>
          <h1>嘿,gay们</h1>
        </div>
        <form>
          <div className={STYLE.role}>
            <RadioGroup onChange={this.changeRole} value={this.state.form.role}>
              <Radio value="student">学生</Radio>
              <Radio value="teacher">老师</Radio>
            </RadioGroup>
          </div>
          <div>
            <input
              type="text"
              maxLength="12"
              placeholder="用户名"
              autoFocus
              onChange={this.changeUsername}
            />
            {
              this.state.err.username ? <Icon className={STYLE.error} type="close" /> : null
            }
          </div>
          <div>
            <input
              type="email"
              maxLength="16"
              placeholder="邮箱"
              onChange={this.changeEmail}
            />
            {
              this.state.err.email ? <Icon className={STYLE.error} type="close" /> : null
            }
          </div>
          <div className={STYLE.emailCode}>
            <input
              type="text"
              maxLength="6"
              placeholder="验证码"
              onChange={this.changeCode}
            />
            {
              this.state.err.code ? <Icon className={STYLE.errorCode} type="close" /> : null
            }
            {
              this.state.countdown === 60 ? <Button type="primary" onClick={this.getCode}>获取验证码</Button> :
              <Button type="dashed">{this.state.countdown}秒后可重发</Button>
            }
          </div>
          <div className={STYLE.password}>
            <input
              type={this.state.passwordShow ? "text" : "password"}
              maxLength="14"
              placeholder="密码"
              onChange={this.changePassword}
            />
            {
              this.state.err.password ? <Icon className={STYLE.errorPassword} type="close" /> : null
            }
            <Icon
              type="eye"
              onClick={() => this.setState((prevstate) => ({passwordShow: !prevstate.passwordShow }))}
              className={this.state.passwordShow ? "blue" : "gray"}
            />
          </div>
          <div className={STYLE.button}>
            <Button type="primary">注册</Button>
          </div>
        </form>
        <span>
          <Link to="/login/loginIn">已有账号？去登录</Link>
        </span>
      </div>
    )
  }
}

export default connect(state => state, loginActions)(Register);
