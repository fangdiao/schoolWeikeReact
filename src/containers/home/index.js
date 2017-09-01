import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';

import CurdBox from 'components/FDCurd/CurdBox';
import RangeCurd from 'components/FDCurd/RangeCurd';
import UserCurd from 'components/FDCurd/UserCurd';
import Projects from './Projects';

import STYLE from './style';

export default class Home extends React.Component {

  render() {
    return (
      <div className={STYLE.home}>
        <Row>
          <Col span={18}>
            <Projects  />
          </Col>
          <Col span={6}>
            <CurdBox>
              <RangeCurd />
              <UserCurd />
            </CurdBox>
          </Col>
        </Row>
      </div>
    )
  }
}
