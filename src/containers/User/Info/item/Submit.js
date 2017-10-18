import React from 'react';
import classnames from 'classnames';
import { Button, message, Spin } from 'antd';
import _ from 'lodash';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

const INFO_ERROR = {
  'skills': '请选择技能',
  'qq': '请填写正确的qq号码',
  'selfFeel': '请填写自我评价',
  'experience': '请填写项目经验'
}

class Submit extends React.Component {

  state = {
    loading: false
  }

  //提交
  onClick = () => {
    let { form, actions, data } = this.props;
    let { completed, role } = data.user;
    role = role === 'ROLE_STUDENT';
    let error = _.findKey(form, (o) => o.length === 0);
    console.log(error)
    if (error) {
      message.destroy();
      return message.info(INFO_ERROR[error]);
    } else {
      this.setState({ loading: true });

      const result = r => {
        let { ifSuccess, msg } = r.payload;
        const success = () => this.setState({ loading: false }, () => message.success('修改信息成功'));
        const error = (msg) => { message.destroy(); return message.error(msg); };
        return ifSuccess ? success() : error(msg);
      };

      switch(true) {
        //学生修改信息
        case(completed && role):
          actions.studentChangeInfo(form).then(r => result(r));
          break;
        //学生提交信息
        case(!completed && role):
          actions.studentInfo(form).then(r => result(r));
          break;
        //老师修改信息
        case(completed && !role):
          actions.teacherChangeInfo(form).then(r => result(r));
          break;
        //老师提交信息
        case(!completed && !role):
          actions.teacherInfo(form).then(r => result(r));
          break;
      }
    }

  }

  render() {
    let { loading } = this.state;
    let { completed } = this.props.data.user;
    return (
      <Spin spinning={loading}>
        <div className={classnames(STYLE.submit, STYLE.item)}>
          <Button onClick={this.onClick} type="primary">{completed?'保存修改':'提交表单'}</Button>
        </div>
      </Spin>
    )
  }
}

export default connect(state => state.login, loginActions)(Submit);
