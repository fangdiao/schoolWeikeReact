import React from 'react';
import FrameHeader from './FrameHeader';
import FrameFooter from './Framefooter';
export default class Frame extends React.Component {


  render() {
    return (
      <div>
        <FrameHeader />
        { this.props.children }
        <FrameFooter />
      </div>
    )
  }
}
