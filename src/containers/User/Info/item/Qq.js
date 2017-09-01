import React from 'react';

import classnames from 'classnames';
import STYLE from './style';

export default class Qq extends React.Component {

  render() {
    return (
      <div className={classnames(STYLE.qq, STYLE.item)}>
        <span>QQ</span>
        <input type="text" />
      </div>
    )
  }
}
