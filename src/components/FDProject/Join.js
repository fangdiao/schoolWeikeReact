import React from 'react';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';
import { Popconfirm } from 'antd';

import './style';

class Join extends React.Component {

  state = {
    join: '',
  }

  join = () => {
    let { projectName, actions } = this.props;
    actions.join({ projectName, content: '11' }).then(r => {
      let { ifSuccess } = r.payload;
      if (ifSuccess) {
        this.setState({ join: '已申请' });
      }
    });
  }

  componentWillMount() {
    let {data: {user: { username } }, proApplyingPerson, applySuccessPerson } = this.props;
    let isJoin = proApplyingPerson.filter(item => item === username).length > 0;
    let isJoinSuccess = applySuccessPerson.filter(item => item === username).length > 0;
    let join = '';
    switch (true) {
      case isJoin:
        join = '已申请';
        break;
      case isJoinSuccess:
        join = '成功申请';
        break;
    }
    this.setState({ join });
  }


  render() {
    let { join } = this.state;
    return (
      !join ? (
        <Popconfirm onConfirm={this.join} title="申请后无法取消，确认继续" getPopupContainer={() => document.querySelector('.content')}>
          <span className="FDProject-button" >
            <span><i className="iconfont icon-user-plus"></i>参加</span>
          </span>
        </Popconfirm>
      ) : (
        <span className="FDProject-button">
          <span><i className="iconfont icon-user-plus red"></i>{join}</span>
        </span>
      )
    )
  }
}

export default connect(state => ({ ...state.home, ...state.login }), homeActions)(Join);