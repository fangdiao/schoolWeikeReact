import React from 'react';
import classnames from 'classnames';
import { Button, message } from 'antd';
import _ from 'lodash';
import { connect } from 'utils/helper';
import loginActions from 'actions/login';
import STYLE from './style';

const INFO_ERROR = {
  'skillsSuccess': '请选择特长',
  'qqSuccess': '请填写正确的qq号码',
  'selfFeelSuccess': '请认真填写自我评价',
}

class Submit extends React.Component {

  //提交
  onClick = () => {
    let { success, form, actions, data } = this.props;
    let { completed, role } = data.user;
    role = role === 'ROLE_STUDENT' ? true : false;
    let error = _.findKey(success, (o) => o === false);
    if (error) {
      message.destroy();
      return message.info(INFO_ERROR[error]);
    } else {
      switch(true) {
        //学生修改信息
        case(completed && role):
          actions.studentChangeInfo(form);
          break;
        //学生提交信息
        case(!completed && role):
          actions.studentInfo(form);
          break;
        //老师修改信息
        case(completed && !role):
          actions.teacherChangeInfo(form);
          break;
        //老师提交信息
        case(!completed && !role):
          actions.teacherInfo(form);
          break;
      }
    }

  }

  render() {
    let { completed } = this.props.data.user;
    return (
      <div className={classnames(STYLE.submit, STYLE.item)}>
        <Button onClick={this.onClick} type="primary">{completed?'保存修改':'提交表单'}</Button>
      </div>
    )
  }
}

export default connect(state => state.login, loginActions)(Submit);
