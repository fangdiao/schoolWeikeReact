import React from 'react';
import classnames from 'classnames';
import { Button, message } from 'antd';
import _ from 'lodash';

import { connect } from 'utils/helper';
import userProActions from 'actions/userProjects';

import STYLE from './style';

const INFO_ERROR = {
  'projectName': '请填写正确项目名称',
  'projectKind': '请填写正确的项目类型',
  'projectNeed': '请选择项目要求',
  'projectProfile': '项目简介至少100字',
}

class Submit extends React.Component {

  formCheck = form => {
    let error = _.findKey(form, item => item.length === 0);
    if (!error) {
      if (form.projectProfile.length <= 100) {
        message.destroy();
        message.error(INFO_ERROR['projectProfile']);
      } else {
        return true;
      }
    } else {
      message.destroy();
      message.error(INFO_ERROR[error]);
      return false;
    }

  }

  //提交
  onClick = () => {
    let { form, actions, projectName, data, releaseButton } = this.props;
    let { completed, role } = data.login.user;
    if (completed) {
      let check = this.formCheck(form);
      if (check) {
        role = role === 'ROLE_STUDENT';
        releaseButton(true);

        const result = r => {
          let { ifSuccess, msg } = r.payload;
          if (ifSuccess) {
            message.success('操作成功');
          } else {
            message.destroy();
            message.error(msg);
          }
          releaseButton(false)
        };
        let { changePro, studentRePro, teacherRePro } = actions;
        switch(true) {
          //修改项目
          case(!!projectName):
            changePro({ projectName, projectInfo: { ...form } }).then(r => result(r));
            break;
          //学生发布项目
          case(role):
            studentRePro(form).then(r => result(r));
            break;
          //老师发布项目
          case(role):
            teacherRePro(form).then(r => result(r));
            break;
        }
      }
    } else {
      message.destroy();
      message.error('您还没有填写个人信息');
    }
  }

  render() {
    let { projectName } = this.props;
    return (
      <div className={classnames(STYLE.submit, STYLE.item)}>
        <Button onClick={this.onClick} type="primary">{projectName?'保存修改':'发布项目'}</Button>
      </div>
    )
  }
}

export default connect(state => state, userProActions)(Submit);
