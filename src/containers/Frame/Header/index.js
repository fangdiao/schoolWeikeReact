import React from 'react';
import Logo from './Logo'
import Search from './Search';
import Status from './Status';
import { Row, Col } from 'antd';
import './style.less';

export default class Header extends React.Component {
  render() {
    return (
      <header className="reset">
        <div className="container">
          <Row>
            <Col span={3}>
              <Logo />
            </Col>
            <Col span={7} offset={7}>
              <Search />
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
