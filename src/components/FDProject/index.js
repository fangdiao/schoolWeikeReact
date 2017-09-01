import React from 'react';
import UserHead from './userHead';
import Publisher from './Publisher';
import ProjectProfile from './ProjectProfile';
import NeedSkill from './NeedSkill';
import { Icon } from 'antd';
import Join from './Join';
import Attention from './Attention';

import {getFormat,getMoment,getTimestamp} from 'utils/helper';


import './style';

export default class Home extends React.Component {
  render() {

    let { projectId, publisher, projectKind, projectName ,projectProfile, projectNeed } = this.props;
    let { projectStart, projectEnd, clickNum, attention, joinSuccess, joining } = this.props;
    let attentionNum = attention.length;
    return (
      <div className="FDProject-project">
        <h3>{projectKind}</h3>
        <Publisher {...publisher} />
        <h1>{projectName}</h1>
        <ProjectProfile projectProfile={projectProfile} />
        <NeedSkill projectNeed={projectNeed} />
        <div className="FDProject-joined">
          {
            joinSuccess.map((item, index) => <UserHead key={index} {...item}/>)
          }
        </div>
        <div className="FDProject-join-attention">
          <Attention projectName={projectName} attention={attention} />
          <Join projectName={projectName} joining={joining}  />
        </div>
        <div className="FDProject-time">
          <span>
            <i className="iconfont icon-history"></i> {getFormat(projectStart, 'YYYY/MM/DD')} 至 {getFormat(projectEnd, 'YYYY/MM/DD')}
          </span>
          <span><i className="iconfont icon-caret-up"></i> {clickNum}</span>
        </div>
      </div>
    )
  }
}
