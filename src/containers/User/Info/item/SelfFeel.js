import React from 'react';

import classnames from 'classnames';
import STYLE from './style';

export default class SelfFeel extends React.Component {

  onChange = (e) => {
    let { toParent } = this.props;
    let selfFeel = e.target.value;
    let selfFeelSuccess = selfFeel.length > 0 ? true : false;
    toParent({ selfFeel }, { selfFeelSuccess });
  }

  render() {
    return (
      <div className={classnames(STYLE.selfFeel, STYLE.item)}>
        <span>自我评价</span>
        <textarea onChange={this.onChange} rows="4" type="text" />
      </div>
    )
  }
}
