import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';
import { bindActionCreators } from 'redux';

class Home extends React.Component {


  render() {
    console.log(this.props)
    return (
      <h2>home333</h2>
    )
  }
}

export default connect(state => state, homeActions)(Home);
