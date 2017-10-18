import React from 'react';

import './style';

export default class extends React.Component {

  onChange = (e) => {
    let { toParent, type } = this.props;
    type[Object.keys(type)[0]] = e.target.value;
    toParent(type);
  }

  render() {
    let { title, type } = this.props;
    return (
      <div className="FDInfo">
        <span className="title">{title}</span>
        <input className="input" value={type[Object.keys(type)[0]]} onChange={this.onChange} type="text" />
      </div>
    )
  }
}
