import React from 'react';
import _ from 'lodash';

import FDProject from 'components/FDProject';

import STYLE from './style';

export default class Projects extends React.Component {

  state = {
    minHeight: window.innerHeight
  }

  render() {
    let { projects, hasResult } = this.props;
    return (
      <div className={STYLE.projects} style={this.state}>
        {
          !hasResult ? (
            <div className={STYLE.noRusult}>
              <i className="iconfont icon-frown-o"></i>
              <span>很遗憾，没有为您找到合适的项目!</span>
            </div>
          ) : (
            _.isEmpty(projects) ? null :
              projects.map((item, index) => <FDProject {...item} key={index} />)
          )
        }
      </div>
    )
  }
}