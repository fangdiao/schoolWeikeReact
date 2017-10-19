import React from 'react';
import { Row, Col } from 'antd';
import STYLE from './style';

export default class Item extends React.Component {
  render() {
    let { text, title }  = this.props;
    return (
      <div className={STYLE.proDetailsItem}>
        <Row>
          <Col span={6}>
            <h3>{title}</h3>
          </Col>
          <Col span={18}>
            <p>{text}</p>
          </Col>
        </Row>
      </div>
    )
  }
}