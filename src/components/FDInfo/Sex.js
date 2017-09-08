import React from 'react';
import { Radio } from 'antd';

import STYLE from './style';

const RadioGroup = Radio.Group;

export default class extends React.Component {

  state = {
    sex: ''
  }

  componentWillReceiveProps(nextProps) {
    let { sex } = nextProps;
    this.setState(sex);
  }

  onChange = (e) => {
    let { toParent } = this.props;
    let sex = e.target.value;
    this.setState({ sex }, () => toParent({ sex }));
  }

  render() {
    return (
      <div className="FDInfo">
        <span className="title">性别</span>
        <RadioGroup onChange={this.onChange} value={this.state.sex}>
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
        </RadioGroup>
      </div>
    )
  }
}
