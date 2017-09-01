import React from 'react';

import classnames from 'classnames';
import STYLE from './style';

export default class SelfFeel extends React.Component {

  render() {
    return (
      <div className={classnames(STYLE.selfFeel, STYLE.item)}>
        <span>自我评价</span>
        <textarea rows="4" type="text" />
      </div>
    )
  }
}
