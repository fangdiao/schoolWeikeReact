import React from 'react';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

class Release extends React.Component {

  state = {
    form: {
      projectName: '',
      projectKind: '',
      projectStart: '',
      projectEnd: '',
      numNeed: 5,
      projectNeed: '',
      projectProfile: '',
    },
    success: {
      projectName: false,
      projectKind: false,
      projectStart: false,
      projectEnd: false,
      projectNeed: false,
      projectProfile: false,
    }
  }

  render() {
    return (
      <div className={STYLE.release}>
        release
      </div>
    )
  }
}

export default connect(state => state.login, loginActions)(Release);
