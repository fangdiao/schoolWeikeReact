import React from 'react';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import STYLE from './style';

export default class extends React.Component {

  state = {
    qq: ''
  }

  componentWillReceiveProps(nextProps) {
    let { qq } = nextProps;
    this.setState({ qq });
  }

  onChange = (e) => {
    let qq = e.target.value.replace(/\D*/g, '');
    let { toParent } = this.props;
    this.setState({ qq }, () => toParent({ qq }));
  }

  render() {
    let { qq } = this.state;
    let { title } = this.props;
    return (
      <div className="FDInfo">
        <span className="title">{title}</span>
      <input className="input" value={qq} onChange={this.onChange} type="text" maxLength="15"/>
      </div>
    )
  }
}
