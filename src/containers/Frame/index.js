import React from 'react';
import { hashHistory } from 'react-router';
import { isEmpty } from 'lodash';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';
import Header from './Header';

class Frame extends React.Component {

  tokenCheck = () => {
    let token = '';
    let { pathname } = this.props.location;
    if (localStorage.weike) {
      token = JSON.parse(localStorage.weike).token;
      if (!token) {
        if (!/\/login/g.test(pathname)) {
          hashHistory.push(`/login/loginIn`);
        }
      }
    }
  }

  componentDidMount() {
    document.title = '校园威客平台';
    let token = '';
    let { user } = this.props.data;
    let { pathname } = this.props.location;
    if (pathname === '/') {
      hashHistory.push('/dist');
    }
    if (localStorage.weike) {
      token = JSON.parse(localStorage.weike).token;
      if (token && isEmpty(user)) {
        let { loginWithToken } = this.props.actions;
        loginWithToken();
      }
    }
    setInterval(this.tokenCheck, 500);
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
