import React from 'react';
import { hashHistory } from 'react-router';
import { isEmpty } from 'lodash';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';
import Header from './Header';

class Frame extends React.Component {

  componentWillMount() {
    document.title = '校园威客平台';
    let token = '';
    let { user } = this.props.data;
    if (!!localStorage.weike) {
      token = JSON.parse(localStorage.weike).token;
      if (token && isEmpty(user)) {
        let { loginWithToken } = this.props.actions;
        loginWithToken();
      }
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="content">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => state.login, loginActions)(Frame);
