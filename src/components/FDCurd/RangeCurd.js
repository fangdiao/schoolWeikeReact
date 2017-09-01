import React from 'react';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';

import './style';

class Range extends React.Component {

  state = {
    type: ''
  }

  range = (e) => {
    let { skills } = this.props.data.user.info;
    let type = e.target.dataset.range;
    this.setState({ type },() => {
      let { actions } = this.props;
      type !== 'projectNeed' ? actions.range({ type }) : actions.range({ type, skills });
    });
  }

  render() {
    let { type } = this.state;
    let className = "background-select";
    return (
      <ul className="FDCurd-range" onClick={this.range}>
        <li><h3>排序</h3></li>
        <li data-range="projectNeed" className={type === "projectNeed" ? className : ''}>
          <i className="iconfont icon-heart"></i>相关程度
        </li>
        <li data-range="projectStart" className={type === "projectStart" ? className : ''}>
          <i className="iconfont icon-history"></i>最新
        </li>
        <li data-range="attention" className={type === "attention" ? className : ''}>
          <i className="iconfont icon-star"></i>关注度
        </li>
        <li data-range="clickNum" className={type === "clickNum" ? className : ''}>
          <i className="iconfont icon-caret-up"></i>点击数
        </li>
        <li data-range="joinSuccess" className={type === "joinSuccess" ? className : ''}>
          <i className="iconfont icon-user-plus"></i>参与人数
        </li>
      </ul>
    )
  }
}
export default connect(state => ({ ...state.home, ...state.login }), homeActions)(Range);
