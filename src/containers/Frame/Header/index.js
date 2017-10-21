import React from 'react';
import { Row, Col } from 'antd';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';
import Logo from './Logo'
import Search from './Search';
import Status from './Status';
import './style.less';

class Header extends React.Component {
  render() {
    let { user } = this.props.data;
    return (
      <header className="reset">
        <div className="container">
          <Row>
            <Col span={3}>
              <Logo user={user} />
            </Col>
            <Col span={7} offset={7}>
              <Search user={user} />
            </Col>
            <Col span={7}>
              <Status />
            </Col>
          </Row>
        </div>
      </header>
    )
  }
}
export default connect(state => state.login, loginActions)(Header);

