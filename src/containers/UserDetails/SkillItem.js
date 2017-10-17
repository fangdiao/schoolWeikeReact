import React from 'react';
import { Row, Col } from 'antd';

import STYLE from './style';

export default class SkillItem extends React.Component {
  render() {
    let { skills } = this.props;
    return (
      <div className={STYLE.userDetItem}>
        <Row>
          <Col span={8}>
            <h3>技能</h3>
          </Col>
          <Col span={16}>
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