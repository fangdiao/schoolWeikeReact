import React from 'react';
import FDProject from 'components/FDProject';

import STYLE from './style';

export default class Projects extends React.Component {
  render() {
    return (
      <div className={STYLE.projects}>
        <FDProject />
        <FDProject />
        <FDProject />
        <FDProject />
        <FDProject />
        <FDProject />
        <FDProject />
        <FDProject />
      </div>
    )
  }
}
