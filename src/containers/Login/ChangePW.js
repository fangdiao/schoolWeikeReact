import React from 'react';
import { Icon, Button } from 'antd';
import NameInput from 'components/FDInput/NameInput';
import MailInput from 'components/FDInput/MailInput';

import STYLE from './style';

export default class ChangePW extends React.Component {

  state = {
    mail: false
  }

  mailToParent = (boolean) => {
    this.setState({
      mail: boolean
    });
  }

  render() {
    return (
      <div className={STYLE.wraper}>
        <div>
          <h1>嘿,gay们</h1>
        </div>
        <form>
          <NameInput mailToParent={this.mailToParent} />
          <MailInput />
          <div className={STYLE.button}>
            <Button type="primary" htmlType="submit" onClick={this.upForm}>注册</Button>
          </div>
        </form>
        <span>

        </span>
      </div>
    )
  }
}
