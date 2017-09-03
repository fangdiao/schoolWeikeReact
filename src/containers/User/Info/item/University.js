import React from 'react';
import classnames from 'classnames';
import { Select } from 'antd';

import STYLE from './style';

const Option = Select.Option;

export default class University extends React.Component {

  render() {
    let { university } = this.props;
    return (
      <div className={classnames(STYLE.university, STYLE.item)} ref={ele => this.university = ele}>
        <span>院校</span>
        <Select defaultValue={university} getPopupContainer={() => this.university}>
          <Option value="西南石油大学">西南石油大学</Option>
        </Select>
      </div>
    )
  }
}
