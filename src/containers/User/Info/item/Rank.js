import React from 'react';
import classnames from 'classnames';
import { Select } from 'antd';

import STYLE from './style';

const Option = Select.Option;

export default class Rank extends React.Component {

  onChange = (rank) => {
    let { toParent } = this.props;
    toParent({ rank });
  }

  render() {
    let { rank } = this.props;
    return (
      <div className={classnames(STYLE.major, STYLE.item)} ref={ele => this.rank = ele}>
        <span>职称</span>
        <Select onChange={this.onChange} defaultValue={rank} getPopupContainer={() => this.rank}>
          <Option value="助教">助教</Option>
          <Option value="讲师">讲师</Option>
          <Option value="副教授">副教授</Option>
          <Option value="教授">教授</Option>
          <Option value="博士生导师">博士生导师</Option>
        </Select>
      </div>
    )
  }
}
