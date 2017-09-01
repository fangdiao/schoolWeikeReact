import React from 'react';
import classnames from 'classnames';
import STYLE from './style';

export default class Name extends React.Component {

  render() {
    return (
      <div className={classnames(STYLE.experience, STYLE.item)}>
        <span>项目经验</span>
        <textarea rows="4" type="text" placeholder="(选填)"/>
      </div>
    )
  }
}
