import React from 'react';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import FDImageEditor from 'components/FDImageEditor';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudentInfo';
import STYLE from './style';

class Info extends React.Component {

  render() {
    let { user } = this.props.data;
    return (
      <div className={STYLE.info}>
      {
        user.role === 'ROLE_STUDENT' ? <StudentInfo /> : <TeacherInfo/>
      }
      </div>
    )
  }
}

export default connect(state => state.login, loginActions)(Info);
