import React from 'react';
import classnames from 'classnames';

import STYLE from './style';

export default class Name extends React.Component {

  render() {
    let { username } = this.props;
    return (
      <div className={classnames(STYLE.item, STYLE.name)}>
        <span>{username}</span>
      </div>
    )
  }
}
