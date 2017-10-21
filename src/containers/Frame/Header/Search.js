import React from 'react';
import { Icon } from 'antd';
import { isEmpty } from 'lodash';
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
    let { user } = this.props;
    return (
      <div className={STYLE.search}>
        {
          isEmpty(user) ? null : (
            <span>
              <input type="primary" onKeyUp={this.onKeyUp} value={keyWords} onChange={(e) => this.setState({keyWords: e.target.value})}/>
              <Icon type="search" onClick={this.onclick}/>
            </span>
          )
        }
      </div>
    )
  }
}
