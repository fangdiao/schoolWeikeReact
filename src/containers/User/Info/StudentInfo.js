import React from 'react';
import { Row, Col } from 'antd';
import _ from 'lodash';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import Textarea from 'components/FDInfo/Textarea';
import Qq from 'components/FDInfo/Qq';
import Time from 'components/FDInfo/Time';
import Sex from 'components/FDInfo/Sex';
import DropDown from 'components/FDInfo/DropDown';
import Skills from 'components/FDInfo/Skills';
import Name from './item/Name';
import Submit from './item/Submit';
import FDImageEditor from 'components/FDImageEditor';

import FDLoadingWrapper from 'components/FDLoadingWrapper';

import STYLE from './style';

class StudentInfo extends React.Component {

  //默认值
  state = {
    form: {
      image: '11',
      sex: '男',
      eduBackgroud: '本科',
      university: '西南石油大学',
      majorAndGrade: '网络工程',
      entryUniversity: 1409500800000,
      leaveUniversity: 1530374400000,
      skills: [],
      experience: '',
      qq: '',
      selfFeel: '',
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
          let omit = ['id', 'username', 'level', 'email'];
          let form = _.omit(data, omit);
          let loading = false;
          this.setState({ ...this.state, form, loading });
        }
      };
      actions.studentPersonalData().then(r => callback(r))
    }
  }

  toParent = (value) => this.setState({ form: { ...this.state.form, ...value } })

  render() {
    let { username } = this.props.data.user;
    let { sex, eduBackgroud, university, majorAndGrade, qq,
      entryUniversity, leaveUniversity, skills, experience, selfFeel } = this.state.form;
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
              <DropDown type={{eduBackgroud}} title="学历" toParent={this.toParent} />
              <DropDown type={{university}} title="学校" toParent={this.toParent} />
              <DropDown type={{majorAndGrade}} title="专业" toParent={this.toParent} />
              <Time title="进校时间" toParent={this.toParent} type={{entryUniversity}} />
              <Time title="毕业时间" toParent={this.toParent} type={{leaveUniversity}} />
              <Skills skills={skills} title="技能" toParent={this.toParent} />
              <Qq qq={qq} toParent={this.toParent} title="QQ" />
              <Textarea  title="项目经验" type={{experience}} toParent={this.toParent} />
              <Textarea title="自我评价" type={{selfFeel}} toParent={this.toParent} />
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
export default connect(state => state.login, loginActions)(StudentInfo);
