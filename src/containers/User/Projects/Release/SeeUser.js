import React from 'react';
import { Tabs, Spin, Row, Col, message } from 'antd';

import { connect } from 'utils/helper';
import userActions from 'actions/userProjects';

import UserDetailsItem from './UserDetailsItem';
import UserItem from './UserItem';
import STYLE from './style';

const TabPane = Tabs.TabPane;
const NO_BODY_APPLY = '亲，暂时没有同学申请项目哦';
const NO_BODY_SUCCESS = '亲，暂时没有同学成功申请项目哦';

class SeeUser extends React.Component {

  state = {
    proApplyingPerson: [],
    applySuccessPerson: [],
    loading: true,
  }

  agree = (projectApplicant) => {
    let { actions, projectName } = this.props;
    let { applySuccessPerson, proApplyingPerson } = this.state;
    actions.agree({ projectAbout: projectName , projectApplicant }).then(r => {
      let { ifSuccess } = r.payload;
      if (ifSuccess) {
        applySuccessPerson = [ ...applySuccessPerson, projectApplicant ];
        proApplyingPerson = proApplyingPerson.filter(item => item !== projectApplicant);
        this.setState({ applySuccessPerson, proApplyingPerson });
        message.success('同意成功');
      } else {
        message.error('操作失败');
      }
    });
  }

  refuse = (projectApplicant) => {
    let { actions, projectName } = this.props;
    let { proApplyingPerson } = this.state;
    actions.refuse({ projectAbout: projectName , projectApplicant }).then(r => {
      let { ifSuccess } = r.payload;
      if (ifSuccess) {
        proApplyingPerson = proApplyingPerson.filter(item => item !== projectApplicant);
        this.setState({ proApplyingPerson });
        message.success('拒绝成功');
      } else {
        message.error('操作失败');
      }
    });
  }


  componentWillMount() {
    let { projectName, actions: { projectsUser } } = this.props;
    projectsUser({ projectName }).then( r => {
      let { proApplyingPerson, applySuccessPerson } = r.payload.data;
      this.setState({ proApplyingPerson, applySuccessPerson, loading: false });
    });
  }

  render() {
    let { proApplyingPerson, applySuccessPerson, loading } = this.state;
    let { getBack } = this.props;
    return (
      <Spin spinning={loading} >
        <div className={STYLE.back}>
          <span onClick={getBack}>
            <i className="iconfont icon-angle-double-left"></i>返回
          </span>
        </div>
        <Tabs size="small" style={{"marginTop": "10px"}}>
          <TabPane key="1" tab={`已有${applySuccessPerson.length}人参与`}>
            <Row>
              {
                !applySuccessPerson.length ? NO_BODY_SUCCESS : (
                  applySuccessPerson.map((item, index) => (
                    <Col span={8} key={index}>
                      <div className={STYLE.wrapper}>
                        <UserDetailsItem key={index} username={item}/>
                      </div>
                    </Col>
                  ))
                )
              }
            </Row>
          </TabPane>
          <TabPane key="2" tab={`${proApplyingPerson.length}人的申请待处理`}>
            <Row>
              {
                !proApplyingPerson.length ? NO_BODY_APPLY : (
                  proApplyingPerson.map((item, index) => (
                    <Col span={8} key={index}>
                      <div className={STYLE.wrapper}>
                        <UserItem agree={this.agree} refuse={this.refuse} username={item}/>
                      </div>
                    </Col>
                  ))
                )
              }
            </Row>
          </TabPane>
        </Tabs>
      </Spin>
    )
  }
}
export default connect(state => state.userProjects, userActions)(SeeUser);

