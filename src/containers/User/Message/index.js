import React from 'react';
import { Spin, Tabs } from 'antd';
import  { isEmpty } from 'lodash';

import MessagePage from './MessagePage';
import userProjectsActions from 'actions/userProjects';
import { connect } from 'utils/helper';

import STYLE from './style';

const TabPane = Tabs.TabPane;
const TIP = '没有消息哦';

class Item extends React.Component {

  state = {
    loading: true,
    hasFrom: true,
    hasTo: true,
  }

  onClick = () => {

  }

  componentWillMount() {
    let { message } = this.props.actions;
    message().then(r =>{
      let { fromMessages, toMessages } = r.payload.data;
      let hasFrom = isEmpty(fromMessages);
      let hasTo = isEmpty(toMessages);
      this.setState({ hasFrom, hasTo, loading: false });
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    let { loading, hasFrom, hasTo } = this.state;
    let { fromMessages = [], toMessages = [] } = this.props.data.message;
    return (
      <div>
        <Spin spinning={loading}>
          <Tabs>
            <TabPane key="1" tab="我的消息">
              <div className={STYLE.message}>
                {
                  hasFrom ? TIP : <MessagePage items={fromMessages}/>

                }
              </div>
            </TabPane>
            <TabPane key="2" tab="发出的消息">
              <div className={STYLE.message}>
                {
                  hasTo ? TIP : <MessagePage items={toMessages}/>
                }
              </div>
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    )
  }
}

export default connect(state => state.userProjects, userProjectsActions)(Item);