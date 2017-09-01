import React from 'react';
import FDProject from 'components/FDProject';
import { connect } from 'utils/helper';
import _ from 'lodash';
import homeActions from 'actions/home';
import { Spin } from 'antd';

import STYLE from './style';

class Projects extends React.Component {

  state = {
    minHeight: window.innerHeight
  }

  componentWillMount() {
    let { actions } = this.props;
    actions.indexProjects();
  }

  render() {
    let { projects, user } = this.props.data;
    return (
      <div className={STYLE.projects} style={this.state}>
        {
          _.isEmpty(projects) ? <Spin className="loading" size="large" tip="Loading..." /> :
          projects.map(item => <FDProject user={user} {...item} key={item.projectStart} />)
        }
      </div>
    )
  }
}

export default connect(state => state.home, homeActions)(Projects);
