import React from 'react';
import UserHead from './userHead';
import { Link } from 'react-router';
import './style';


export default class Publisher extends React.Component {
  render() {
    let { username, image, role } = this.props;
    let path = role === 'ROLE_STUDENT' ? 'student' : 'teacher';
    return (
      <Link to={`/details/${path}/${username}`} target="_blank">
        <span className="FDProject-publisher">
          <UserHead {...this.props} />
          <span>{username}</span>
          <span>{role === "ROLE_STUDENT" ? "学生" : "老师"}</span>
        </span>
      </Link>
    )
  }
}
