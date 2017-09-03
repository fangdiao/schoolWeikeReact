import React from 'react';
import { Row, Col } from 'antd';

import Name from './item/Name';
import Sex from './item/Sex';
import EduBackground from './item/EduBackground';
import University from './item/University';
import Academy from './item/Academy';
import Major from './item/Major';
import EntryUniversity from './item/EntryUniversity';
import LeaveUniversity from './item/LeaveUniversity';
import Skills from './item/Skills';
import Experience from './item/Experience';
import Qq from './item/Qq';
import SelfFeel from './item/SelfFeel';
import Submit from './item/Submit';
import FDImageEditor from 'components/FDImageEditor';


import STYLE from './style';

export default class StudentInfo extends React.Component {

  //默认值
  state = {
    form: {
      image: '',
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
    success: {
      skillsSuccess: false,
      qqSuccess: false,
      selfFeelSuccess: false
    }
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
    let { form, success } = this.state;
    let { sex, eduBackgroud, university, majorAndGrade, entryUniversity, leaveUniversity } = form;
    return (
      <form>
        <Row>
          <Col span={4}>
            <FDImageEditor toParent={this.toParent} />
          </Col>
          <Col span={20}>
            <div className={STYLE.text}>
              <Sex toParent={this.toParent} sex={sex} />
              <EduBackground toParent={this.toParent} eduBackgroud={eduBackgroud} />
              <University toParent={this.toParent} university={university} />
              {/* <Academy toParent={this.toParent} academy={academy} /> */}
              <Major toParent={this.toParent} majorAndGrade={majorAndGrade} />
              <EntryUniversity toParent={this.toParent} entryUniversity={entryUniversity} />
              <LeaveUniversity toParent={this.toParent} leaveUniversity={leaveUniversity} />
              <Skills toParent={this.toParent} />
              <Experience toParent={this.toParent} />
              <Qq toParent={this.toParent} />
              <SelfFeel toParent={this.toParent} />
              <Submit toParent={this.toParent} success={success} form={form} />
            </div>
          </Col>
        </Row>
      </form>
    )
  }
}
