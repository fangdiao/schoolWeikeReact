import React from 'react';
import { Icon } from 'antd';
import { hashHistory } from 'react-router';

import STYLE from './style';

export default class Search extends React.Component {

  state = {
    keyWords: '',
    focus: false
  }

  onclick = () => {
    let { keyWords } = this.state;
    if (keyWords) {
      console.log(keyWords);
      hashHistory.push(`/dist/search/${keyWords}`);
    }
  }

  onKeyUp = e => {
    if (e.keyCode === 13) {
      this.onclick();
    }
    return;
  }

  render() {
    let {keyWords} = this.state;
    return (
      <div className={STYLE.search}>
        <span>
          <input type="primary" onKeyUp={this.onKeyUp} value={keyWords} onChange={(e) => this.setState({keyWords: e.target.value})}/>
          <Icon type="search" onClick={this.onclick}/>
        </span>
      </div>
    )
  }
}
