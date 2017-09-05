import React from 'react';

import classnames from 'classnames';
import STYLE from './style';

export default class Qq extends React.Component {

  state = {
    value: ''
  }

  onChange = (e) => {
    let { toParent } = this.props;
    let qq = e.target.value.replace(/\D*/g, '');
    let qqSuccess = qq.length > 5 && qq.length < 13 ? true : false;
    qq = Number(qq);
    this.setState({ value: qq }, () => toParent({ qq }, { qqSuccess }));
  }

  render() {
    return (
      <div className={classnames(STYLE.qq, STYLE.item)}>
        <span>QQ</span>
        <input onChange={this.onChange} type="text" value={this.state.value} />
      </div>
    )
  }
}
