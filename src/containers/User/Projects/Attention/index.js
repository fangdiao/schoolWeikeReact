import React from 'react';

import Item from './Item';

export default class extends React.Component {
  render() {
    let { items } = this.props;
    return (
      <div>
        {
          items.map((item, index) => <Item key={index} item={item} />)
        }
      </div>
    )
  }
}