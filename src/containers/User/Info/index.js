import React from 'react';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import FDImageEditor from 'components/FDImageEditor';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudentInfo';
import STYLE from './style';

class Info extends React.Component {

  render() {
    let { role, username } = this.props.data.user;
    return (
      <div className={STYLE.info}>
      {
        role === 'ROLE_STUDENT' ? <StudentInfo username={username} /> : <TeacherInfo username={username}/>
      }
      </div>
    )
  }
}

export default connect(state => state.login, loginActions)(Info);
