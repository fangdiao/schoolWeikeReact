import React from 'react';
import { Tabs } from 'antd';

import ItemBox from './ItemBox';

const TabPane = Tabs.TabPane;
const TIP = '没有相关数据';

export default class Join extends React.Component {
  render() {
    let { appling, applyFaild ,applySuccess } = this.props.items;
    return (
      <div>
        <Tabs size="small">
          <TabPane key="1" tab="申请成功">
            {
              !applySuccess.length ? TIP : <ItemBox items={applySuccess} />
            }
          </TabPane>
          <TabPane key="2" tab="正在申请">
            {
              !appling.length ? TIP : <ItemBox items={appling} />
            }
          </TabPane>
          <TabPane key="3" tab="申请失败">
            {
              !applyFaild.length ? TIP : <ItemBox items={applyFaild} />
            }
          </TabPane>
        </Tabs>
      </div>
    )
  }
}