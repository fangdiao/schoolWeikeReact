import React from 'react';
import { Link } from 'react-router';
import STYLE from './style';

export default class Logo extends React.Component {

  render() {
    return (
      <Link to="/dist" className={STYLE.logo}></Link>
    )
  }
}
