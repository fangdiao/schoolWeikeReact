import React from 'react';
import { Link } from 'react-router';
import { Popconfirm, message } from 'antd';

import STYLE from './style';

export default class UserItem extends React.Component {

  render() {
    let {username, agree, refuse} = this.props;
    return (
      <div className={STYLE.myPro}>
        <div className={STYLE.handleUser}>
          <span>
            <Link to={`/details/student/${username}`} target="_blank">
              <i className="iconfont icon-user"></i>
              <span className="margin-sm">{username}</span>
            </Link>
          </span>
          <span style={{"marginLeft": "30px"}}>
            <Popconfirm onConfirm={() => agree(username)} title="同意后无法取消,确认继续?">
              <i className="iconfont icon-thumbs-o-up"></i>
            </Popconfirm>
          </span>
          <span>
            <Popconfirm onConfirm={() => refuse(username)} title="确定残忍拒绝吗?">
              <i className="iconfont icon-thumbs-o-down"></i>
            </Popconfirm>
          </span>
        </div>
      </div>
    )
  }
}