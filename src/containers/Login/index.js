import React from 'react';
import { Icon, Button } from 'antd';

import FDAnimate from 'components/FDAnimate';

import STYLE from './style';

export default class Login extends React.Component {
  render() {
    return (
      <div className={STYLE.login}>
        <FDAnimate />
        { this.props.children }
      </div>
    );
  }
}
