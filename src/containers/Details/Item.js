import React from 'react';
import { Row, Col } from 'antd';

import STYLE from './style';

export default class extends React.Component {
 render() {
   let { type, text } = this.props;
   return (
     <div className={STYLE.userDetItem}>
       <Row>
         <Col span={6}>
           <h3>{type}</h3>
         </Col>
         <Col span={16} offset={2}>
           <p>{text}</p>
         </Col>
       </Row>
     </div>
   )
 }
}