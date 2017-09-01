import React from 'react';
import classnames from 'classnames';
import { Button } from 'antd';

import STYLE from './style';

export default class Submit extends React.Component {
  render() {
    return (
      <div className={classnames(STYLE.submit, STYLE.item)}>
        <Button type="primary">提交</Button>
      </div>
    )
  }
}
