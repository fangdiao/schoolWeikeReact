import React from 'react';

import './style';

export default class Curd extends React.Component {

  state = {
    windowWidth: 0
  }

  componentWillMount() {
    const getWidth = () => {
      this.setState({
        windowWidth: window.innerWidth
      });
    }
    getWidth();
    window.onresize = getWidth;
  }

  render() {
    let { windowWidth } = this.state;
    let left =  740;
    let width = 240;
    switch(true) {
      case (windowWidth >= 1400):
        left = (windowWidth - 1100) / 2 + 795 + 20;
        width = 265;
        break;
      case (windowWidth > 1000):
        left = (windowWidth - 1000) / 2 + 740;
        break;
    }
    return (
      <div className="FDCurd-nav" style={{ left, width }} >
        {
          this.props.children
        }
      </div>
    )
  }
}
