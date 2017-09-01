import React from 'react';
import classnames from 'classnames';
import FDSkills from 'components/FDSkills';
import STYLE from './style';

export default class Skills extends React.Component {

  render() {

    return (
      <div className={classnames(STYLE.skills, STYLE.item)} ref={ele => this.skills = ele}>
        <span>特长</span>
      <FDSkills width={400} />
      </div>
    )
  }
}
