import React from 'react';
import { Link } from 'react-router';
import { Popconfirm } from 'antd';

import { connect } from 'utils/helper';
import userActions from 'actions/userProjects';

import STYLE from './style';

class ProItem extends React.Component {

  delete = () => {
    let { actions: { deleteProject }, projectName } = this.props;
    deleteProject({ projectName });
  }

  render() {
    let { projectName, getUser } = this.props;
    return (
      <div className={STYLE.myPro}>
        <Link to={`/details/project/${projectName}`} target="_blank">
          <i className="iconfont icon-file-text-o"></i>
          <span className="margin-sm">{projectName}</span>
        </Link>
        <span className={STYLE.proIcon}>
          <i onClick={() => getUser(projectName)} className="iconfont icon-user"></i>
          <Link to={`/user/changePro/${projectName}`} target="_blank">
            <i className="iconfont icon-wrench"></i>
          </Link>
          <Popconfirm onConfirm={this.delete} title="删除后无法回退，确认继续?">
            <i className="iconfont icon-cut"></i>
          </Popconfirm>
        </span>
      </div>
    );
  }
}
export default connect(state => state.userProjects, userActions)(ProItem);
