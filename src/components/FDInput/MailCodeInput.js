import React from 'react'
import { Icon, Button } from 'antd';
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
    let { actions, mail } = this.props;
    actions.getEmailCode({ mail });

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
  }

  onChange = (e) => {
    let text = e.target.value;
    let { toParent } = this.props;
    this.setState({
      err: text.length < 6
    }, () => toParent({ mailCode: text }, { mailCode: !!text && !this.state.err })
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
          maxLength="6"
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
