import React from 'react';
import { hashHistory } from 'react-router';

import Header from './Header';
export default class Frame extends React.Component {

  componentWillMount() {
    let { pathname } = this.props.location;
    if (pathname === '/') {
      hashHistory.push('/dist');
    }
    document.title = '校园威客平台';
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="content">
            { this.props.children }
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    )
  }
}
