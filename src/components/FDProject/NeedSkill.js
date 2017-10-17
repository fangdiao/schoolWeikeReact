import React from 'react';
import { connect } from 'utils/helper';
import _ from 'lodash';
import homeActions from 'actions/home';

import './style';

class NeedSkill extends React.Component {

  render() {
    let { projectNeed, data: { user } } = this.props;
    let common = _.intersection(projectNeed, []);
    return (
      <div className="FDProject-need">
        {
          projectNeed.map((item, index) => {
            let className = common.filter( o => o === item).length > 0 ? 'red' : '';
            return <span key={index} className={className}>{item}</span>;
          })
        }
      </div>
    )
  }
}

export default connect(state => state.login, homeActions)(NeedSkill);
