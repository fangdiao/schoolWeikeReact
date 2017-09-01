import React from 'react';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';
import { Button, Popconfirm } from 'antd';

import './style';

class Join extends React.Component {

  join = () => {
    let { projectName, actions, data: { user: { username } } } = this.props;
    actions.join({ username, projectName });
  }

  render() {
    let { joining, projectName, data: { user }, joinEle } = this.props;
    let isJoining = joining.filter(item => item === user.username).length > 0;
    return (
      !isJoining ? (
        <Popconfirm onConfirm={this.join} title="申请后无法取消，确认继续" getPopupContainer={() => document.querySelector('.content')}>
          <Button className="FDProject-join" >
            <span><i className="iconfont icon-user-plus"></i>申请</span>
            <span>{joining.length}</span>
          </Button>
        </Popconfirm>
      ) : (
        <Button className="FDProject-join">
          <span><i className="iconfont icon-user-plus red"></i>已申请</span>
          <span>{joining.length}</span>
        </Button>
      )
    )
  }
}

export default connect(state => ({ ...state.home, ...state.login }), homeActions)(Join);
