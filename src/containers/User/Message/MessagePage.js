import React from 'react';
import { Pagination } from 'antd';

import MessageItem from './MessageItem';

import STYLE from './style';

export default class MessagePage extends React.Component {

  state = {
    current: 1,
    pageSize: 8,
    total: 0,
    startNum: 0,
    endNum: 8,
  }

  onChange = (page) => {
    let { pageSize, startNum, endNum } = this.state;
    startNum = (page - 1) * pageSize;
    endNum = page * pageSize;
    this.setState({ current : page, startNum, endNum });
  }

  componentWillMount() {
    let { pageSize } = this.state;
    let { items } = this.props;
    this.setState({ total: items.length, endNum: pageSize });
  }

  render() {
    let { current, pageSize, total, startNum, endNum } = this.state;
    let { items } = this.props;
    return (
      <div>
        <div className={STYLE.page}>
          {
            items.slice(startNum, endNum).map((item, index) => <MessageItem key={index} {...item} />)
          }
        </div>
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          onChange={this.onChange}
        />
      </div>
    )
  }
}