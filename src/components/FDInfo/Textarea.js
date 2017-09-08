import React from 'react';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import STYLE from './style';

export default class extends React.Component {

  onChange = (e) => {
    let { toParent, type } = this.props;
    type[Object.keys(type)[0]] = e.target.value;
    toParent(type);
  }

  render() {
    let { title, type } = this.props;
    return (
      <div className="FDInfo">
        <span className="title">{title}</span>
        <textarea value={type[Object.keys(type)[0]]} className="input" onChange={this.onChange} rows="4" type="text" />
      </div>
    )
  }
}
