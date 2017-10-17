import React from 'react';
import { Link } from 'react-router';

import STYLE from './style';

export default class UserDetailsItem extends React.Component {

  render() {
    let { username } = this.props;
    return (
      <div className={STYLE.myPro} style={{"textAlign": "center"}}>
        <Link to={`/details/student/${username}`} target="_blank">
          <i className="iconfont icon-user"></i>
          <span className="margin-sm">{username}</span>
        </Link>
      </div>
    )
  }
}