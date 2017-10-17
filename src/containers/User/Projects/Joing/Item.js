import React from 'react';
import { Link } from 'react-router';

import STYLE from './style';

export default class extends React.Component {
  render() {
    let { projectName } = this.props;
    return (
      <div className={STYLE.itemPro}>
        <Link to={`/details/project/${projectName}`} target="_blank">
          <i className="iconfont icon-file-text-o"></i>
          <span className="margin-sm">{projectName}</span>
        </Link>
      </div>
    );
  }
}