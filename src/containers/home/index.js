import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';

import Curd from './Curd';
import Projects from './Projects';

import STYLE from './style';

class Home extends React.Component {

  render() {
    return (
      <div className={STYLE.home}>
        <Row>
          <Col span={18}>
            <Projects />
          </Col>
          <Col span={6}>
            <Curd />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => state, homeActions)(Home);
