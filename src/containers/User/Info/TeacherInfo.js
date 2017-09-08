import React from 'react';
import { Row, Col } from 'antd';

import Qq from 'components/FDInfo/Qq';
import Sex from 'components/FDInfo/Sex';
import DropDown from 'components/FDInfo/DropDown';
import Name from './item/Name';
import Submit from './item/Submit';
import FDImageEditor from 'components/FDImageEditor';

import FDLoadingWrapper from 'components/FDLoadingWrapper';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';
import STYLE from './style';

class TeacherInfo extends React.Component {

  //默认值
  state = {
    form: {
      image: '11',
      sex: '男',
      university: '西南石油大学',
      academy: '计算机科学与技术学院',
      rank: '讲师',
      qq: '',
    },
    loading: false
  }

  componentWillMount() {
    let { actions } = this.props;
    let { completed, role } = this.props.data.user;
    if (completed) {
      this.setState({ loading: true });
      const callback = (r) => {
        let { ifSuccess, data } = r.payload;
        if (ifSuccess) {
          let omit = ['id', 'username', 'role', 'email'];
          let form = _.omit(data, omit);
          let loading = false;
          this.setState({ ...this.state, form, loading });
        }
      };
    actions.teacherPersonalData().then(r => callback(r));
    }
  }

  toParent = (value) => this.setState({ form: { ...this.state.form, ...value } })

  render() {
    let { username } = this.props.data.user;
    let { qq, academy, sex, eduBackgroud, university, rank } = this.state.form;
    return (
      <form>
        <Row>
          <Col span={4}>
            <FDImageEditor toParent={this.toParent} />
          </Col>
          <Col span={20}>
            <div className={STYLE.text}>
              <Name username={username} />
              <Sex toParent={this.toParent} sex={{sex}} />
              <DropDown type={{rank}} title="学历" toParent={this.toParent} />
              <DropDown type={{university}} title="学校" toParent={this.toParent} />
              <DropDown type={{academy}} title="学历" toParent={this.toParent} />
              <Qq qq={qq} toParent={this.toParent} title="QQ" />
              <Submit toParent={this.toParent} form={this.state.form} />
            </div>
          </Col>
        </Row>
        {
          this.state.loading ? <FDLoadingWrapper tip="正在加载个人信息"/> : null
        }
      </form>
    )
  }
}

export default connect(state => state.login, loginActions)(TeacherInfo);
