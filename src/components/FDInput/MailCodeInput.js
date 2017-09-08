import React from 'react'
import { Icon, Button, message } from 'antd';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

class MailCodeInput extends React.Component {

  static defaultProps = {
    toParent: () => {}
  }

  state = {
    err: false,
    countdown: 60
  }

  getCode = () => {
    let { actions, email, role, username, type } = this.props;
    let form = { username, email };
    if (type === 'password') {
      role === 'student' ?
      actions.studentChangePWEmailCode(form).then(r => callback(r)) :
      actions.teacherChangePWEmailCode(form).then(r => callback(r));
    } else {
      role === 'student' ?
      actions.studentEmailCode(form).then(r => callback(r)) :
      actions.teacherEmailCode(form).then(r => callback(r));
    }

    const callback = (r) => {
      let { ifSuccess, msg } = r.payload;
      if (ifSuccess) {
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
        message.destroy();
        message.error(msg);
      }
    }
  }

  onChange = (e) => {
    let text = e.target.value;
    let { toParent } = this.props;
    this.setState({
      err: text.length < 4
    }, () => toParent({ verifyCode: text }, { verifyCode: !!text && !this.state.err })
    );

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let { err, countdown } = this.state;
    let className = this.props.height ? "mail-code height" : "mail-code";
    return (
      <div className={className}>
        <input
          type="text"
          maxLength="4"
          placeholder="验证码"
          onChange={this.onChange}
        />
        {
          err ? <Icon className="mail-code-error error" type="close" /> : null
        }
        {
          countdown === 60 ? <Button type="primary" onClick={this.getCode}>获取验证码</Button> :
          <Button type="dashed">{countdown}秒后可重发</Button>
        }
      </div>
    )
  }
}
export default connect(state => state.login, loginActions)(MailCodeInput);
