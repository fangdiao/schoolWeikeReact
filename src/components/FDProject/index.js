import React from 'react';
import moment from 'moment';

import UserHead from './userHead';
import Publisher from './Publisher';
import ProjectProfile from './ProjectProfile';
import NeedSkill from './NeedSkill';
import Join from './Join';
import Details from './Details';
import Attention from './Attention';

import './style';

const dateFormat = 'YYYY-MM-DD';

export default class Home extends React.Component {
  render() {

    let {
      personData,
      projectDetails,
      applySuccessNum,
      followPros,
      applySuccessPerson,
      proApplyingPerson,
    } = this.props;
    let {
      projectName,
      projectNeed,
      projectKind,
      projectProfile,
      projectStart,
      projectEnd,
      projectConnector,
      proHits,
    } = projectDetails;
    return (
      <div className="FDProject-project">
        <h3>{`项目类型: projectKind`}</h3>
        <Publisher {...personData} />
        <h1>{projectName}</h1>
        <ProjectProfile projectProfile={projectProfile} />
        <NeedSkill projectNeed={projectNeed} />
        <div className="FDProject-joined">
          {/*{*/}
            {/*applySuccessPerson.map((item, index) => <UserHead key={index} {...item}/>)*/}
          {/*}*/}
        </div>
        <div className="FDProject-join-attention">
          <Attention projectConnector={projectConnector} projectName={projectName} followPros={followPros} />
          <Join applySuccessPerson={applySuccessPerson} proApplyingPerson={proApplyingPerson} projectName={projectName} />
          <Details projectName={projectName}/>
        </div>
        <div className="FDProject-time">
          <span>
            <i className="iconfont icon-history"></i> {moment(projectStart).format(dateFormat)} 至 {moment(projectEnd).format(dateFormat)}
          </span>
          <span><i className="iconfont icon-caret-up"></i> {proHits}</span>
          <span><i className="iconfont icon-user"> {applySuccessNum+proApplyingPerson.length}</i></span>
        </div>
      </div>
    )
  }
}
