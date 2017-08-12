import React from 'react';
import LoginOutStatus from './LoginOutStatus';
import { connect } from 'utils/helper';
import LoginStatus from './LoginStatus'
import loginActions from 'actions/login';

class Status extends React.Component {

  componentWillMount() {
    let weike = localStorage.weike ? JSON.parse(localStorage.weike) : null;
    if (weike) {
      let { actions } = this.props;
      actions.loginWithStorage(weike);
    }
  }

  render() {
    let { user } = this.props.data;
    return (
      <div>
        {
          user.info ? <LoginStatus user={user}/> : <LoginOutStatus />
        }
      </div>
    )
  }
}

export default connect(state => state.login, loginActions)(Status);
