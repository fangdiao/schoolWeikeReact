import React from 'react';
import { Tabs, Spin, message } from 'antd';
import { isEmpty } from 'lodash';


import Release from './Release';
import Joing from './Joing';
import Attention from './Attention';
import { connect } from 'utils/helper';
import userActions from 'actions/userProjects';

import STYLE from './style';

const TabPane = Tabs.TabPane;
const TIP = '没有相关数据';

class Project extends React.Component {

  state = {
    hasAttention: true,
    hasJoin: true,
    hasRelease: true,
    join: [],
  }

  componentWillMount() {
    let { data: { user }, actions } = this.props;
    let { followPros, studentAllProject, teacherAllProject, joinProject } = actions;
    let allProject = user.role === 'ROLE_STUDENT' ?  studentAllProject : teacherAllProject;
    allProject().then(r => {
      let { data, ifSuccess } = r.payload;
      if (ifSuccess) {
        if (isEmpty(data)) {
          this.setState({ hasRelease: null });
        }
      }
      this.setState({ hasRelease: false });
    });
    followPros().then(r => {
      let { data, ifSuccess } = r.payload;
      if (ifSuccess) {
        if (isEmpty(data)) {
          this.setState({ hasAttention: null });
        }
      }
      this.setState({ hasAttention: false });
    });
    joinProject().then(r => {
      let { data, ifSuccess } = r.payload;
      if (ifSuccess) {
        if (isEmpty(data)) {
          this.setState({ hasJoin: null });
        }
      }
      this.setState({ hasJoin: false, join: data });
    });
  }

  render() {
    let { attention = [], release = [] } = this.props.data;
    let { hasAttention, hasJoin, hasRelease, join } = this.state;
    return (
     <div className={STYLE.userProject}>
       <div>
         <Tabs>
           <TabPane key="1" tab="我的发布">
             <Spin spinning={hasRelease === true}>
                 {
                   hasRelease === null ? TIP : <Release items={release} type="pro"/>
                 }
             </Spin>
           </TabPane>
           <TabPane key="2" tab="我的申请">
             <Spin spinning={hasJoin === true}>
               {
                 hasJoin === null ? TIP : <Joing items={join}/>
               }
             </Spin>
           </TabPane>
           <TabPane key="3" tab="我的关注">
             <Spin spinning={hasAttention === true}>
               {
                 hasAttention === null ? TIP : <Attention items={attention} />
               }
             </Spin>
           </TabPane>
         </Tabs>
       </div>
     </div>
    )
  }
}
export default connect(state => ({ ...state.userProjects, ...state.login }), userActions)(Project);
