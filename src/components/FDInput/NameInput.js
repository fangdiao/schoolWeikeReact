import React from 'react'
import { Button, Icon } from 'antd';

import STYLE from './style';

export default class NameInput extends React.Component {

  state = {
    err: false
  }

  onChange = (e) => {
    let text = e.target.value;
    let { toParent } = this.props;
    this.setState({
      err: !!!text
    }, () => toParent({ username: text }, { username: !!text && !this.state.err })
    );

  }

  render() {
    return (
      <div className="name">
        <input
          type="text"
          maxLength="12"
          placeholder="用户名"
          onChange={this.onChange}
          autoFocus
        />
        {
          this.state.err ? <Icon className="error" type="close" /> : null
        }
      </div>
    )
  }
}
