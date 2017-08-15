import React from 'react';
import { Icon, Button, message } from 'antd';

import MailInput from 'components/FDInput/MailInput';
import MailCodeInput from 'components/FDInput/MailCodeInput';
import PWInput from 'components/FDInput/PWInput';

import { connect } from 'utils/helper';
import loginActions from 'actions/login';

import STYLE from './style';

class ChangePW extends React.Component {

  state = {
    form: {
      mail: '',
      mailCode: ''
    },
    success: {
      mail: false,
      mailCode: false
    },

  }

  toParent = (value, success) => {
    this.setState({
      form: { ...this.state.form, ...value },
      success: { ...this.state.success, ...success }
    });
  }

  getMailCode = () => {
    let { form, success } = this.state;
    if (!_.findKey(success, (item) => item === false)) {
      let { actions } = this.props;
      actions.PWMailTest(form);
    } else {
      message.destroy();
      message.error('请正确填写个人信息');
    }
  }

  upPW = () => {
    let { form, success } = this.state;
    if (!_.findKey(success, item => item === false)) {
      if (form.password === form.newPassword) {
        let { actions } = this.props;
        let { mail, password } = form;
        actions.changePW({ mail, password });
      } else {
        message.destroy();
        message.error('两次密码必须相同');
      }
    } else {
      message.destroy();
      message.error('请正确填写个人信息');
    }

  }

  render() {
    let { form, success } = this.state;
    let { canChange } = this.props.data;
    return (
      !canChange ? (
        <div className={STYLE.changePW}>
          <h1>修改密码</h1>
          <form>
            <MailInput toParent={this.toParent} />
            <MailCodeInput mail={form.mail} toParent={this.toParent} height={success.mail} />
            <div className={STYLE.button}>
              <Button type="primary" htmlType="submit" onClick={this.getMailCode}>提交</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className={STYLE.changePW}>
          <h1>设置新密码</h1>
          <form>
            <PWInput type="password" ref={ele => this.password = ele} toParent={this.toParent} />
            <PWInput type="newPassword" ref={ele => this.newPassword = ele} placeholder="新密码" toParent={this.toParent} />
            <div className={STYLE.button}>
              <Button type="primary" htmlType="submit" onClick={this.upPW}>提交</Button>
            </div>
          </form>
        </div>
      )
    )
  }
}
export default connect(state => state.login, loginActions)(ChangePW);
