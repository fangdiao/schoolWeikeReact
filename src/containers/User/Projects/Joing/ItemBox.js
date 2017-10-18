import React from 'react';
import { Row, Col } from 'antd';

import Item from './Item';

import STYLE from './style';


export default class Join extends React.Component {
  render() {
    let { items = [] } = this.props;
    return (
      <Row>
        {
          items.map((item, index) => (
            <Col span={8} key={index}>
              <div className={STYLE.wrapper}>
                <Item projectName={item} />
              </div>
            </Col>
          ))
        }
      </Row>
    )
  }
}