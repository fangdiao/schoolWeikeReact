import React from 'react';
import { Spin } from 'antd';
import { isEmpty } from 'lodash';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';

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
    defaultData: {},
    loading: false
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
        this.setState({ loading: true });
        projectsDetails({ projectName: query }).then(r => {
          let { data } = r.payload;
          this.setState({ loading: false, defaultData: data });
        });
      }
    }
  }

  render() {
    let {
      form: { projectName, projectKind, projectStart, projectEnd, numNeed, projectNeed, projectProfile },
      loading,
      defaultData
    } = this.state;
    if (!isEmpty(defaultData)) {
      let {

      } = defaultData;
    }
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
          <Submit toParent={this.toParent} form={this.state.form} />
        </form>
      </Spin>
    )
  }
}

export default connect(state => state.login, loginActions)(ReleaseChange);
