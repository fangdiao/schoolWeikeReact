import React from 'react';
import { Spin } from 'antd';
import './style';
export default class FDLoadingWrapper extends React.Component {
  render() {
    let { tip } = this.props;
    return (
      <div className="FDLoadingWrapper">
        <Spin tip={tip} />
      </div>
    )
  }
}
