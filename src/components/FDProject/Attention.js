import React from 'react';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';
import { Button } from 'antd';

import './style';

class Attention extends React.Component {

  attention = () => {
    let { projectName, actions, data: { user: { username } } } = this.props;
    actions.attention({ username, projectName });
  }

  cancleAttention = () => {
    let { projectName, actions, data: { user: { username } } } = this.props;
    actions.cancleAttention({ username, projectName });
  }

  render() {
    let { attention, projectName, data: { user } } = this.props;
    let isAttention = attention.filter(item => item === user.username).length > 0;
    let className = isAttention ? "iconfont icon-star red" : "iconfont icon-star";
    return (
      <Button onClick={isAttention ? this.cancleAttention : this.attention} className="FDProject-attention">
        <span><i className={className}></i>{isAttention ? "取消关注" : "关注"}</span>
        <span>{attention.length}</span>
      </Button>
    )
  }
}


export default connect(state => ({ ...state.home, ...state.login }), homeActions)(Attention);
