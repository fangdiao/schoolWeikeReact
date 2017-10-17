import React from 'react';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';

import './style';

class Attention extends React.Component {

  state = {
    isAttention: false,
    followNum: 0,
  }

  componentWillMount() {
    let { followPros, data: { user } } = this.props;
    let isAttention = followPros.filter(item => item === user.username).length > 0;
    this.setState({ isAttention, followNum: followPros.length });
  }

  attention = () => {
    let { followNum } = this.state;
    let { projectName, actions, projectConnector } = this.props;
    actions.attention({ projectConnector, projectName }).then(r => {
      if (!r.error) {
        let { ifSuccess } = r.payload;
        ifSuccess ? this.setState({ isAttention: true, followNum: ++followNum }) : null;
      }
    });
  }

  cancleAttention = () => {
    let { actions, projectName, projectConnector } = this.props;
    let { followNum } = this.state;
    actions.cancleAttention({ projectConnector, projectName }).then(r => {
      if (!r.error) {
        let { ifSuccess } = r.payload;
        ifSuccess ? this.setState({ isAttention: false, followNum: --followNum }) : null;
      }
    });
  }

  render() {
    let { isAttention, followNum } = this.state;
    let className = isAttention ? "iconfont icon-star red" : "iconfont icon-star";
    return (
      <span onClick={isAttention ? this.cancleAttention : this.attention} className="FDProject-attention FDProject-button">
        <span><i className={className}></i>{isAttention ? "取消关注" : "关注"}</span>
        <span>{followNum}</span>
      </span>
    )
  }
}


export default connect(state => ({ ...state.home, ...state.login }), homeActions)(Attention);
