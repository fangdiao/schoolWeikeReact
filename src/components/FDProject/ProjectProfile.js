import React from 'react';

import './style';

export default class ProjectProfile extends React.Component {

  state = {
    projectProfile: '',
    over: false
  }

  componentWillMount() {
    let { projectProfile } = this.props;
    this.setState({
      projectProfile: projectProfile.length > 130 ? projectProfile.slice(0, 129) + '...' : projectProfile,
      over: projectProfile.length > 130
    });
  }

  showAll = () => {
    let { projectProfile } = this.props;
    this.setState({
      projectProfile: projectProfile,
      over: false
    });
  }

  render() {
    let { projectProfile, over } = this.state;
    return (
      <p>
        <span>{this.state.projectProfile}</span>
        {
          over ? <span onClick={this.showAll}> 显示全部<i className="iconfont icon-caret-down"></i></span> : null
        }
      </p>
    )
  }
}
