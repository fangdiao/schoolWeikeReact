import React from 'react';
import { Popover, Avatar, Button } from 'antd';

import './style';

export default class UserHead extends React.Component {
  render() {
    let { username, image, role } = this.props;

    const content = (
      <div>
        <Avatar shape="square" size="large" icon="user" src={image} />
        <Button>找他(她)聊天</Button>
      </div>
    );
    return (

      <Popover placement="bottomLeft" content={content} title={username}>
        <Avatar shape="square" size="middle" icon="user" src={image} />
      </Popover>
    )
  }
}
