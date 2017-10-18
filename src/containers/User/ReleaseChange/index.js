import React from 'react';
import { Spin } from 'antd';

import { connect } from 'utils/helper';
import userProActions from 'actions/userProjects';

import Skills from 'components/FDInfo/Skills';
import SortInput from 'components/FDInfo/SortInput';
import Textarea from 'components/FDInfo/Textarea';
import DropDown from 'components/FDInfo/DropDown';
import Submit from './Submit';
import Time from 'components/FDInfo/Time';

import STYLE from './style';

class ReleaseChange extends React.Component {

  state = {
    form: {
      projectName: '',
      projectKind: '',
      projectStart: 1409500800000,
      projectEnd: 1530374400000,
      numNeed: 5,
      projectNeed: [],
      projectProfile: '',
    },
    loading: false,
    isChange: false,
  }

  toParent = (value) => {
    if (Object.keys(value)[0] === 'skills') {
      return this.setState({ form: { projectNeed: value['skills'] } });
    }
    return this.setState({ form: { ...this.state.form, ...value } });
  }

  componentWillMount() {
    let { actions: { projectsDetails }, location: { pathname }, params: { query } } = this.props;
    if (/\/changePro/g.test(pathname)) {
      if (query) {
        this.setState({ loading: true, isChange: true });
        projectsDetails({ projectName: query }).then(r => {
          let { projectDetails } = r.payload.data;
          let {
            projectName,
            projectKind,
            projectStart,
            projectEnd,
            numNeed,
            projectNeed,
            projectProfile,
          } = projectDetails;
          let form = {
            projectName,
            projectKind,
            projectStart,
            projectEnd,
            numNeed,
            projectNeed,
            projectProfile,
          };
          this.setState({ loading: false, form });
        });
      }
    }
  }

  render() {
    let {
      form: {
        projectName,
        projectKind,
        projectStart,
        projectEnd,
        numNeed,
        projectNeed,
        projectProfile,
      },
      loading,
      isChange,
    } = this.state;
    return (
      <Spin spinning={loading}>
        <form className={STYLE.release}>
          <SortInput title="项目名称" type={{projectName}} toParent={this.toParent} />
          <SortInput title="项目类型" type={{projectKind}} toParent={this.toParent} />
          <Time title="开始时间" toParent={this.toParent} type={{projectStart}} />
          <Time title="结束时间" toParent={this.toParent} type={{projectEnd}} />
          <Skills skills={projectNeed} title="技能" toParent={this.toParent} />
          <DropDown type={{numNeed}} title="人数" toParent={this.toParent} />
          <Textarea title="项目简介" type={{projectProfile}} toParent={this.toParent} />
          <Submit isChange={isChange} form={this.state.form} />
        </form>
      </Spin>
    )
  }
}

export default connect(state => state.login, userProActions)(ReleaseChange);
