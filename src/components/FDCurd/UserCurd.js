import React from 'react';
import { Link } from 'react-router';

import './style';

export default class UserCurd extends React.Component {

  render() {

    return (
      <ul className="FDCurd-user">
        <li>
          <Link to="/user/message">
            <span><i className="iconfont icon-bullhorn"></i></span>
            <span>我的消息</span>
          </Link>
        </li>
        <li>
          <Link to="/dist/recommend">
            <span><i className="iconfont icon-child"></i></span>
            <span>个性推荐</span>
          </Link>
        </li>
        <li>
          <Link to="/user/projects">
            <span><i className="iconfont icon-drupal"></i></span>
            <span>我的项目</span>
          </Link>
        </li>
        <li>
          <Link to="/user/release">
            <span><i className="iconfont icon-paper-plane"></i></span>
            <span>发布项目</span>
          </Link>
        </li>
        <li>
          <Link to="/user/info">
            <span><i className="iconfont icon-user"></i></span>
            <span>个人资料</span>
          </Link>
        </li>
      </ul>
    )
  }
}
