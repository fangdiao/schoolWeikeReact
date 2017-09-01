import React from 'react';
import classnames from 'classnames';

import STYLE from './style';

export default class Name extends React.Component {

  render() {
    return (
      <div className={classnames(STYLE.item, STYLE.name)}>
        <span>姓名</span>
        <input type="text" />
      </div>
    )
  }
}
