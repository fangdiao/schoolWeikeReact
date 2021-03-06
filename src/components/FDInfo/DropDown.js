import React from 'react';
import './style';
import { Select } from 'antd';
const Option = Select.Option;

const DROP_DONW = {
  university: ['西南石油大学'],
  eduBackgroud: ['大专', '本科', '硕士', '博士'],
  majorAndGrade: ['网络工程', '软件工程', '物联网工程', '计算机科学与技术', '信息管理'],
  rank: ['助教', '讲师', '副教授', '教授', '博士生导师'],
  academy: ['计算机科学与技术学院'],
  numNeed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
}

export default class extends React.Component {

  onChange = (value) => {
    let { toParent, type } = this.props;
    type[Object.keys(type)[0]] = value;
    toParent(type);
  }

  render() {
    let { type, title } = this.props;
    let key = Object.keys(type)[0];
    let map = DROP_DONW[key];
    return (
      <div className="FDInfo" ref={ele => this.dropdown = ele}>
        <span className="title">{title}</span>
        <Select style={{width: 160}} onChange={this.onChange} value={String(type[key])} getPopupContainer={() => this.dropdown}>
          {
            map.map((item, index) => <Option key={index} value={String(item)}>{item}</Option>)
          }
        </Select>
      </div>
    )
  }
}
