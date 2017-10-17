import React from 'react';
import { Row, Col, Spin } from 'antd';

import Item from './Item';
import SeeUser from './SeeUser';

import STYLE from './style';

export default class Release extends React.Component {

  state = {
    projectName: '',
  }

  getUser = (projectName) => {
    this.setState({ projectName, loading: true });
  }

  getBack = () => {
    this.setState({ projectName: '' });
  }

  render() {
    let { items } = this.props;
    let { projectName } = this.state;
    return (
      <div>
        {
          projectName ? <SeeUser getBack={this.getBack} projectName={projectName}/> : (
            <Row>
              {
                items.map((item, index) => (
                  <Col key={index} span={8}>
                    <div className={STYLE.wrapper}>
                      <Item getUser={this.getUser} projectName={item}/>
                    </div>
                  </Col>
                ))
              }
            </Row>
          )
        }
      </div>
    )
  }
}