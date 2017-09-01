import React from 'react';

import classnames from 'classnames';
import { DatePicker } from 'antd';
import moment from 'moment';

import STYLE from './style';

const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY/MM';

export default class LeaveUniversity extends React.Component {

  render() {
    return (
      <div className={classnames(STYLE.date, STYLE.item)} ref={ele => this.leaveUniversity = ele}>
        <span>毕业时间</span>
        <MonthPicker
          style={{"width": "140px"}}
          defaultValue={moment('2015/01', monthFormat)}
          format={monthFormat}
          getCalendarContainer={() => this.leaveUniversity}
        />
      </div>
    )
  }
}
