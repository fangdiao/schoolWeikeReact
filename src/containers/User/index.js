import React from 'react';
import { Row, Col } from 'antd';
import CurdBox from 'components/FDCurd/CurdBox';
import UserCurd from 'components/FDCurd/UserCurd';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

class User extends React.Component {

  render() {
    let { completed } = this.props.data.user;
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
              <UserCurd completed={completed} />
            </CurdBox>
          </Col>
        </Row>
      </div>
    )
  }
}
export default connect(state => state.login, loginActions)(User);
