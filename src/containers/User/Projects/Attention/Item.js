import React from 'react';
import { Row, Col, Button } from 'antd';

import Details from 'components/FDProject/Details';
import userProjectsActions from 'actions/userProjects';
import { connect } from 'utils/helper';

import STYLE from './style';

class Item extends React.Component {

  onClick = () => {
    let { item: { projectConnector, projectName }, actions } = this.props;
    actions.userCancleAttention({ projectConnector, projectName });
  }

  render() {
    let {
      projectName,
      projectNeed,
      projectConnector
    } = this.props.item;
    return (
      <div className={STYLE.card}>
        <Row>
          <Col span={15}>
            <h1>{projectName}</h1>
            <h2>{projectConnector}</h2>
            <div className={STYLE.skills}>
              {
                projectNeed.map((item, index) => <span key={index}>{item}</span>)
              }
            </div>
          </Col>
          <Col span={5} offset={4}>
            <div className={STYLE.AttentionButton}>
              <Button onClick={this.onClick}>
                <i className="iconfont icon-star"></i>
                <span className="margin-sm">取消关注</span>
              </Button>
            </div>
            <div className={STYLE.button}>
              <Details projectName={projectName} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => state.userProjects, userProjectsActions)(Item);