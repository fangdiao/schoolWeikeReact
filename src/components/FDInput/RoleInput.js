import React from 'react'
import { Radio } from 'antd';

import './style';

const RadioGroup = Radio.Group;

export default class RoleInput extends React.Component {

  static defaultProps = {
    toParent: () => {}
  }

  onChange = (e) => {
    let { toParent } = this.props;
    let role = e.target.value;
    toParent({ role });
  }

  render() {
    let { role } = this.props;
    return (
      <div className="role">
        <RadioGroup onChange={this.onChange} value={role}>
          <Radio value="student">学生</Radio>
          <Radio value="teacher">老师</Radio>
        </RadioGroup>
      </div>
    )
  }
}
