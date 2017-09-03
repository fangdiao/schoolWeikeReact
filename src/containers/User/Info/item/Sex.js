import React from 'react';
import classnames from 'classnames';
import { Radio } from 'antd';

import STYLE from './style';

const RadioGroup = Radio.Group;

export default class Sex extends React.Component {

  state = {
    value: ''
  }

  componentDidMount() {
    let { sex } = this.props;
    this.setState({ value: sex });
  }

  onChange = (e) => {
    let { toParent } = this.props;
    let value = e.target.value;
    this.setState({ value }, () => toParent({ sex: value }));
  }

  render() {
    return (
      <div className={classnames(STYLE.sex, STYLE.item)}>
        <span>性别</span>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
        </RadioGroup>
      </div>
    )
  }
}
