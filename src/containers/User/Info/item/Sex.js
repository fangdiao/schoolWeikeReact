import React from 'react';
import classnames from 'classnames';
import { Radio } from 'antd';

import STYLE from './style';

const RadioGroup = Radio.Group;

export default class Sex extends React.Component {

  render() {
    return (
      <div className={classnames(STYLE.sex, STYLE.item)}>
        <span>性别</span>
        <RadioGroup value="man">
          <Radio value="man">男</Radio>
          <Radio value="woman">女</Radio>
        </RadioGroup>
      </div>
    )
  }
}
