import React from 'react';
import { Row, Col } from 'antd';
import './style';

export default class Item extends React.Component {
  render() {
    let { text, title }  = this.props;
    return (
      <div className="FDProDetails-item">
        <Row>
          <Col span={8}>
            <h3>{title}</h3>
          </Col>
          <Col span={16}>
            <p>{text}</p>
          </Col>
        </Row>
      </div>
    )
  }
}