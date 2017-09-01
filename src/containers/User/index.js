import React from 'react';
import { Row, Col } from 'antd';
import CurdBox from 'components/FDCurd/CurdBox';
import UserCurd from 'components/FDCurd/UserCurd';

import STYLE from './style';

export default class User extends React.Component {
  render() {
    return (
      <div className={STYLE.user}>
        <Row>
          <Col span={18}>
            {
              this.props.children
            }
          </Col>
          <Col span={6}>
            <CurdBox>
              <UserCurd />
            </CurdBox>
          </Col>
        </Row>
      </div>
    )
  }
}
