import React from 'react';
import { isEmpty } from 'lodash';

import LoginOutStatus from './LoginOutStatus';
import { connect } from 'utils/helper';

import LoginStatus from './LoginStatus'
import loginActions from 'actions/login';

class Status extends React.Component {

  componentDidMount() {
    let token = '';
    let { user } = this.props.data;
    if (localStorage.weike) {
      token = JSON.parse(localStorage.weike).token;
      if (token && isEmpty(user)) {
        let { loginWithToken } = this.props.actions;
        loginWithToken();
      }
    }
  }

  render() {
    let { user } = this.props.data;
    return (
      <div>
        {
          user.username ? <LoginStatus user={user}/> : <LoginOutStatus />
        }
      </div>
    )
  }
}

export default connect(state => state.login, loginActions)(Status);
