import React from 'react';
import Animate from './animate';
import { Icon, Button } from 'antd';

import STYLE from './style';

export default class Login extends React.Component {
  render() {
    return (
      <div className={STYLE.login}>
        <Animate />
        { this.props.children }
      </div>
    )
  }
}
