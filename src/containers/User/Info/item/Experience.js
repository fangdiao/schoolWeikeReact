import React from 'react';
import classnames from 'classnames';
import STYLE from './style';

export default class Name extends React.Component {

  onChange = (e) => {
    let { toParent } = this.props;
    toParent({ experience: e.target.value });
  }

  render() {
    return (
      <div className={classnames(STYLE.experience, STYLE.item)}>
        <span>项目经验</span>
        <textarea onChange={this.onChange} rows="4" type="text" />
      </div>
    )
  }
}
