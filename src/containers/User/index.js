import React from 'react';
import { Row, Col } from 'antd';
import CurdBox from 'components/FDCurd/CurdBox';
import UserCurd from 'components/FDCurd/UserCurd';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

class User extends React.Component {

  render() {
    return (
      <Row>
        <Col span={18}>
          <div className={STYLE.box}>
            {
              this.props.children
            }
          </div>
        </Col>
        <Col span={6}>
          <CurdBox>
            <UserCurd/>
          </CurdBox>
        </Col>
      </Row>
    )
  }
}
export default connect(state => state.login, loginActions)(User);
