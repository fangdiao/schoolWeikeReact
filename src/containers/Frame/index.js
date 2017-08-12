import React from 'react';
import Header from './Header';
import Footer from './Footer';
export default class Frame extends React.Component {


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
