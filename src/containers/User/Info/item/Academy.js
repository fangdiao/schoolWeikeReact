import React from 'react';
import { Select } from 'antd';
import classnames from 'classnames';
import STYLE from './style';

const Option = Select.Option;

export default class Academy extends React.Component {

  render() {
    let { academy } = this.props;
    return (
      <div className={classnames(STYLE.academy, STYLE.item)} ref={ele => this.academy = ele}>
        <span>学院</span>
        <Select defaultValue={academy} getPopupContainer={() => this.academy}>
          <Option value="计算机科学与技术学院">计算机科学与技术学院</Option>
        </Select>
      </div>
    )
  }
}
