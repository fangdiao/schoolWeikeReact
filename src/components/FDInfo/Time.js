import React from 'react';

import classnames from 'classnames';
import { DatePicker } from 'antd';
import moment from 'moment';

import './style';

const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY/MM';

export default class extends React.Component {

  onChange = (value) => {
    let { toParent, type } = this.props;
    type[Object.keys(type)[0]] = value.valueOf();
    toParent(type);
  }

  render() {
    let { type, title } = this.props;
    let time = type[Object.keys(type)[0]]
    time = moment(time).format(monthFormat);
    return (
      <div className="FDInfo" ref={ele => this.timeBox = ele}>
        <span className="title">{title}</span>
        <MonthPicker
          onChange={this.onChange}
          style={{"width": "160px"}}
          value={moment(time, monthFormat)}
          format={monthFormat}
          getCalendarContainer={() => this.timeBox}
          allowClear={false}
        />
      </div>
    )
  }
}
