import React from 'react'
import { Icon } from 'antd';

import STYLE from './style';

export default class MailInput extends React.Component {

  state = {
    err: false
  }

  onChange = (e) => {
    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    let text = e.target.value;
    let { toParent } = this.props;
    this.setState({
      err: !reg.test(text)
    }, () => toParent({ mail: text }, { mail: !!text && !this.state.err })
    );

  }

  render() {
    return (
      <div className="mail">
        <input
          type="text"
          maxLength="16"
          placeholder="邮箱"
          onChange={this.onChange}
        />
        {
          this.state.err ? <Icon className="error" type="close" /> : null
        }
      </div>
    )
  }
}
