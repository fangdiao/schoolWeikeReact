import React from 'react';
import { Row, Col } from 'antd';

import STYLE from './style';

export default class Skill extends React.Component {
  render() {
    let { skills }  = this.props;
    return (
      <div className={STYLE.proDetailsItem}>
        <Row>
          <Col span={6}>
            <h3>要求</h3>
          </Col>
          <Col span={18}>
            <p>
              {
                skills.map((item, index) => <span key={index}>{item}</span>)
              }
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}