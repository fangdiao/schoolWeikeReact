import React from 'react';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';

import './style';

class Range extends React.Component {

  state = {
    type: ''
  }

  range = (e) => {
    let type = e.target.dataset.range;
    console.log(type)
    this.setState({ type },() => {
      let { actions } = this.props;
      actions.range({ type });
    });
  }

  render() {
    let { type } = this.state;
    let className = "background-select background-hover";
    return (
      <ul className="FDCurd-range" onClick={this.range}>
        <li><h3>排序</h3></li>
        <li data-range="projectStart" className={type === "projectStart" ? className : ''}>
          <i className="iconfont icon-history"></i>最新
        </li>
        <li data-range="followPros" className={type === "followPros" ? className : ''}>
          <i className="iconfont icon-star"></i>关注度
        </li>
        <li data-range="proHits" className={type === "proHits" ? className : ''}>
          <i className="iconfont icon-caret-up"></i>点击数
        </li>
        <li data-range="person" className={type === "person" ? className : ''}>
          <i className="iconfont icon-user-plus"></i>参与人数
        </li>
      </ul>
    )
  }
}
export default connect(state => ({ ...state.home, ...state.login }), homeActions)(Range);
