import React from 'react';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import FDImageEditor from 'components/FDImageEditor';
import TeacherInfo from './TeacherInfo';
import StudentInfo from './StudentInfo';
import { Row, Col } from 'antd';
import STYLE from './style';

class Info extends React.Component {

  render() {
    let { role } = this.props.data.user;
    return (
      <div className={STYLE.info}>
        <Row>
          <Col span={4}>
            <FDImageEditor />
          </Col>
          <Col span={20}>
            {
              role === 'student' ? <StudentInfo /> : <TeacherInfo />
            }
          </Col>
        </Row>

      </div>
    )
  }
}

export default connect(state => state.login, loginActions)(Info);
