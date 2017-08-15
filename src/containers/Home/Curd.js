import React from 'react';

import STYLE from './style';

export default class Curd extends React.Component {

  state = {
    left: 0,
    width: 0
  }

  componentWillMount() {
    const resize = () => {
      let windowWidth = window.innerWidth;
      let left = 0;
      let width = 292.5 - 20;
      switch(true) {
        case (windowWidth >= 1500):
          left = (windowWidth - 1400) / 2 + 1050;
          width = 407.5 -20;
          break;
        case (windowWidth > 1170):
          left = (windowWidth - 1170) / 2 + 877.5;;
          break;
        default:
          left = 877.5;
      }
      this.setState({ left, width });
    }
    resize();
    window.onresize = resize;
  }

  render() {
    return (
      <div className={STYLE.nav} style={this.state} >
        <div></div>
        <div></div>
      </div>
    )
  }
}
