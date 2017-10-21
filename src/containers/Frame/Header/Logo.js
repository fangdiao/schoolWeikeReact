import React from 'react';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import STYLE from './style';

export default class Logo extends React.Component {
  render() {
    let { user } = this.props;
    return (
      <Link to={isEmpty(user)?`/login/loginIn`:`/dist`} className={STYLE.logo}></Link>
    )
  }
}
