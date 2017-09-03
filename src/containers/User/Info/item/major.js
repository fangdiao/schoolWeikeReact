import React from 'react';
import classnames from 'classnames';
import { Select } from 'antd';

import STYLE from './style';

const Option = Select.Option;

export default class Major extends React.Component {

  onChange = (major) => {
    let { toParent } = this.props;
    toParent({ major });
  }

  render() {
    let { majorAndGrade } = this.props;
    return (
      <div className={classnames(STYLE.major, STYLE.item)} ref={ele => this.major = ele}>
        <span>专业</span>
        <Select onChange={this.onChange} defaultValue={majorAndGrade} getPopupContainer={() => this.major}>
          <Option value="网络工程">网络工程</Option>
          <Option value="软件工程">软件工程</Option>
          <Option value="物理网工程">物理网工程</Option>
          <Option value="计算机科学与技术">计算机科学与技术</Option>
          <Option value="信息管理">信息管理</Option>
        </Select>
      </div>
    )
  }
}
