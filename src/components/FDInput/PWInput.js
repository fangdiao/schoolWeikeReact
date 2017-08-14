import React from 'react'
import { Button, Icon } from 'antd';

import STYLE from './style';

export default class NameInput extends React.Component {

  static defaultProps = {
    toParent: () => {}
  }

  state = {
    err: false,
    passwordShow: false
  }

  onChange = (e) => {
    let text = e.target.value;
    let { toParent } = this.props;
    this.setState({
      err: text.length < 6
    }, () => toParent({ password: text }, { password: !!text && !this.state.err })
    );

  }

  render() {
    let { err, passwordShow } = this.state;
    return (
      <div className="password">
        <input
          type={passwordShow ? "text" : "password"}
          maxLength="14"
          placeholder="密码"
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
