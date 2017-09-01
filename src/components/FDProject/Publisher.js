import React from 'react';
import UserHead from './userHead';

import './style';


export default class Publisher extends React.Component {
  render() {
    let { username, image, role } = this.props;

    return (
      <div className="FDProject-publisher">
        <UserHead {...this.props} />
        <span>{username}</span>
        <span>{role === "student" ? "学生" : "老师"}</span>
      </div>
    )
  }
}
