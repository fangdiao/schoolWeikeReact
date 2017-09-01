import React from 'react';
import { Link } from 'react-router'
import { Icon, Popover, Dropdown, Menu, Avatar } from 'antd';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

class LoginStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    let { actions } = this.props;
    actions.logOut();
  }

  render() {
    let { user } = this.props;
    const menu = (
      <Menu className={STYLE.user}>
        <Menu.Item>
          <Link to="/user">
            <span><Icon type="user" />用户中心</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.logOut}><Icon type="logout" />退出</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={STYLE.LoginStatus} ref="icon">
        <Popover content="123" title="系统消息" getPopupContainer={() => this.refs.icon}>
          <span className={STYLE.icon}><Icon type="mail" />系统消息</span>
        </Popover>
        <Popover content="123" title="站内信" getPopupContainer={() => this.refs.icon}>
          <span className={STYLE.icon}><Icon type="message" />站内信</span>
        </Popover>
        <Dropdown overlay={menu} placement="bottomRight" getPopupContainer={() => this.refs.icon}>
          <span className={STYLE.icon}><Avatar size="middle" src={user.info.image} /></span>
        </Dropdown>
      </div>
    )
  }
}

export default connect(state => state.login, loginActions)(LoginStatus);
