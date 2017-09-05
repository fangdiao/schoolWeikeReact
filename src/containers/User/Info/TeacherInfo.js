import React from 'react';
import { Row, Col } from 'antd';

import Name from './item/Name';
import Sex from './item/Sex';
import University from './item/University';
import Qq from './item/Qq';
import Submit from './item/Submit';
import Rank from './item/Rank';
import Academy from './item/Academy';
import FDImageEditor from 'components/FDImageEditor';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';
import STYLE from './style';

class TeacherInfo extends React.Component {

  //默认值
  state = {
    form: {
      image: '',
      sex: '男',
      university: '西南石油大学',
      academy: '计算机科学与技术学院',
      rank: '讲师',
      qq: '',
    },
    success: {
      qqSuccess: false,
    }
  }

  componentWillMount() {
    let { actions } = this.props;
    let { completed, role } = this.props.data.user;
    if (completed) {
      role === 'ROLE_STUDENT' ? actions.studentPersonalData() : actions.teacherPersonalData();
    }
  }

  componentWillReceiveProps(nextProps) {
    let { rank, sex, qq, completed } = nextProps.data.user;
    this.setState({ form: { ...this.state.form, rank, sex, qq } });
  }

  toParent = (value, success) => {
    if (success) {
      this.setState({
        form: { ...this.state.form, ...value },
        success: { ...this.state.success, ...success }
      });
    } else {
      this.setState({
        form: { ...this.state.form, ...value }
      });
    }
  }

  render() {
    let { username } = this.props.data.user;
    let { form, success } = this.state;
    let { qq, academy, sex, eduBackgroud, university, majorAndGrade, entryUniversity, leaveUniversity, rank } = form;
    return (
      <form>
        <Row>
          <Col span={4}>
            <FDImageEditor toParent={this.toParent} />
          </Col>
          <Col span={20}>
            <div className={STYLE.text}>
              <Name username={username} />
              <Sex toParent={this.toParent} sex={sex} />
              <Rank toParent={this.toParent} rank={rank} />
              <University toParent={this.toParent} university={university} />
              <Academy toParent={this.toParent} academy={academy} />
              <Qq qq={qq} toParent={this.toParent} />
              <Submit toParent={this.toParent} success={success} form={form} />
            </div>
          </Col>
        </Row>
      </form>
    )
  }
}

export default connect(state => state.login, loginActions)(TeacherInfo);
