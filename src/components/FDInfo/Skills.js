import React from 'react';
import classnames from 'classnames';
import FDSkills from 'components/FDSkills';
import './style';

export default class extends React.Component {

  render() {
    let { toParent, title, skills } = this.props;
    return (
      <div className="FDInfo" ref={ele => this.skills = ele}>
        <span className="title">{title}</span>
        <FDSkills skills={skills} toParent={toParent} width="73%" />
      </div>
    )
  }
}
