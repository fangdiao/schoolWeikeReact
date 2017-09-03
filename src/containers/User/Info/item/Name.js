import React from 'react';
import classnames from 'classnames';

import STYLE from './style';

export default class Name extends React.Component {

  onChange = (e) => {
    let name = e.target.value;
    let nameSuccess = name ? true : false;
    let { toParent } = this.props;
    toParent({ name }, { nameSuccess });
  }

  render() {
    return (
      <div className={classnames(STYLE.item, STYLE.name)}>
        <span>姓名</span>
        <input onChange={this.onChange} type="text" />
      </div>
    )
  }
}
