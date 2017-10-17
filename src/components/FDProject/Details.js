import React from 'react';
import { Link } from 'react-router';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';

import './style';

class Details extends React.Component {

  render() {
    let { projectName } = this.props;
    return (
      <span className="FDProject-button" >
        <span>
          <Link to={`/details/project/${projectName}`} target="_blank">
            <i className="iconfont icon-file-text-o"></i>
            <span className="margin-sm">查看详情</span>
          </Link>
        </span>
      </span>
    )
  }
}

export default connect(state => ({ ...state.home, ...state.login }), homeActions)(Details);
