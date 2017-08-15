import React from 'react';
import { Icon, Button } from 'antd';

import STYLE from './style';

export default class Search extends React.Component {

  state = {
    value: '',
    focus: false
  }

  onFocus = () => {
    this.setState({ focus: true });
  }

  onBlur = () => {
    this.setState({ focus: false });
  }

  render() {
    return (
      <div className={STYLE.search}>
        <span>
          <input type="primary" onFocus={this.onFocus} onBlur={this.onBlur}/>
          <Icon type="search" />
        </span>
      </div>
    )
  }
}
