import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';
import { bindActionCreators } from 'redux';

class Home extends React.Component {


  render() {
    return (
      <div>
        <h2>home333</h2>
      </div>
    )
  }
}

export default connect(state => state, homeActions)(Home);
