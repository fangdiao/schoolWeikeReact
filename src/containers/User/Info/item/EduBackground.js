import React from 'react';
import classnames from 'classnames';
import { Select } from 'antd';

import STYLE from './style';

const Option = Select.Option;

export default class EduBackground extends React.Component {

  onChange = (eduBackgroud) => {
    let { toParent } = this.props;
    toParent({ eduBackgroud });
  }

  render() {
    let { eduBackgroud } = this.props;
    return (
      <div className={classnames(STYLE.edu, STYLE.item)} ref={ele => this.edu = ele}>
        <span>学历</span>
        <Select onChange={this.onChange} defaultValue={eduBackgroud} getPopupContainer={() => this.edu}>
          <Option value="大专">大专</Option>
          <Option value="本科">本科</Option>
          <Option value="硕士">硕士</Option>
          <Option value="博士">博士</Option>
        </Select>
      </div>
    )
  }
}
