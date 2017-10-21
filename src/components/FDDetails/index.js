import React from 'react';

import Project from './Project';
import Student from './Student';
import Teacher from './Teacher';

export default class extends React.Component {
  render() {
    let { type } = this.props;
    let content = null;
    switch (type) {
      case('student'):
        content = <Student />;
        break;
      case('teacher'):
        content = <Teacher />;
        break;
      case('project'):
        content = <Project/>;
        break;
    }
    return (
      <div>{content}</div>
    )
  }
}