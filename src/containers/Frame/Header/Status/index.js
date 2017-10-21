import React from 'react';

import LoginStatus from './LoginStatus'
import LoginOutStatus from './LoginOutStatus';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';

class Status extends React.Component {

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
