import React from 'react';
import { Link } from 'react-router';
import STYLE from './style';

export default class Logo extends React.Component {

  render() {
    return (
      <Link to="/" className={STYLE.logo}>
        <span>校</span>
        <span>园</span>
        <span>威</span>
        <span>客</span>
      </Link>
    )
  }
}
