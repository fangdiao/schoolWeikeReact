import React from 'react';
import { Spin, Row, Col } from 'antd';
import moment from 'moment';

import Attention from 'components/FDProject/Attention';
import Join from 'components/FDProject/Join';

import homeActions from 'actions/home';
import { connect } from 'utils/helper';
import Item from './Item';
import Skill from './Skill';

import STYLE from './style';

class ProDetails extends React.Component {

  state = {
    data: {},
    loading: true,
  }

  componentWillMount() {
    let { params: { query }, actions: { projectsDetails } } = this.props;
    projectsDetails({ projectName: query }).then(r => {
      let { data, ifSuccess } = r.payload;
      if (ifSuccess) {
        this.setState({ data, loading: false });
      }
    });
  }

  render() {
    let { data: { projectDetails = {}, applySuccessPerson, proApplyingPerson, followPros }, loading } = this.state;
    let {
      projectName,
      projectKind,
      projectConnector,
      email,
      projectNeed,
      numNeed,
      projectProfile,
      projectStart,
      projectEnd,
    } = projectDetails;
    return (
      <div className={STYLE.proDetails}>
        <Spin spinning={loading}>
          {
            loading ? null : (
              <Row>
                <Col span={20}>
                  <div className={STYLE.detailsBox}>
                    <h1>{projectName}</h1>
                    <Item title="类型" text={projectKind} />
                    <Item title="发布人" text={projectConnector} />
                    <Item title="联系方式" text={email} />
                    <Skill skills={projectNeed} />
                    <Item title="人数" text={numNeed} />
                    <Item title="简介" text={projectProfile} />
                    <Item title="开始时间" text={moment(projectStart).format('YYYY-MM-DD')} />//
                    <Item title="结束时间" text={moment(projectEnd).format('YYYY-MM-DD')} />
                  </div>
                </Col>
                <Col span={3} offset={1}>
                  <div className={STYLE.proDetButton}>
                    <div>
                      <Attention projectConnector={projectConnector} projectName={projectName} followPros={followPros} />
                    </div>
                    <div>
                      <Join applySuccessPerson={applySuccessPerson} proApplyingPerson={proApplyingPerson} projectName={projectName} />
                    </div>
                  </div>
                </Col>
              </Row>
            )
          }
        </Spin>
      </div>
    )
  }
}

export default connect(state => ({ ...state.home, ...state.login }), homeActions)(ProDetails);