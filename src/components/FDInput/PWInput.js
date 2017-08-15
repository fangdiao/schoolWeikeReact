import React from 'react'
import { Button, Icon } from 'antd';

import STYLE from './style';

export default class NameInput extends React.Component {

  static defaultProps = {
    toParent: () => {},
    placeholder: '密码',
    type: 'password'
  }

  state = {
    err: false,
    passwordShow: false
  }

  onChange = (e) => {
    let text = e.target.value;
    let { toParent, type } = this.props;
    this.setState({
      err: text.length < 6
    }, () => type === 'password' ? toParent({ password: text }, { password: !!text && !this.state.err }) :
      toParent({ newPassword: text }, { newPassword: !!text && !this.state.err })
    );

  }

  render() {
    let { err, passwordShow } = this.state;
    let { placeholder } = this.props;
    return (
      <div className="password">
        <input
          type={passwordShow ? "text" : "password"}
          maxLength="14"
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {
          err ? <Icon className="password-error error" type="close" /> : null
        }
        <Icon
          type="eye"
          onClick={() => this.setState((prevstate) => ({passwordShow: !prevstate.passwordShow }))}
          className={passwordShow ? "blue" : "gray"}
        />
      </div>
    )
  }
}
