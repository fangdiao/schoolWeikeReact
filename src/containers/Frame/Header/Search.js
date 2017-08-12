import React from 'react';
import { Icon, Button } from 'antd';

import STYLE from './style';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      value: '',
      focus: false
    }
  }

  onFocus() {
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  render() {
    let searchbarStyle = this.state.focus ? { borderColor: "#49A9EE" } : { borderColor: "#bfbfbf" };
    return (
      <div className={STYLE.search}>
        <span className={STYLE.searchbar} style={searchbarStyle}>
          <input type="primary" onFocus={this.onFocus} onBlur={this.onBlur}/>
          <Icon type="search" />
        </span>
        <Button type="primary" className={this.state.focus ? "hide" : "show"}>发布项目</Button>
      </div>
    )
  }
}
