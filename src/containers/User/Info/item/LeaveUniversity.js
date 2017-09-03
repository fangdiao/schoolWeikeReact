import React from 'react';

import classnames from 'classnames';
import { DatePicker } from 'antd';
import moment from 'moment';

import STYLE from './style';

const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY/MM';

export default class LeaveUniversity extends React.Component {

  onChange = (value) => {
    let { toParent } = this.props;
    toParent({ leaveUniversity: value.valueOf() });
  }

  render() {
    let { leaveUniversity } = this.props;
    leaveUniversity = moment(leaveUniversity).format(monthFormat);
    return (
      <div className={classnames(STYLE.date, STYLE.item)} ref={ele => this.leaveUniversity = ele}>
        <span>毕业时间</span>
        <MonthPicker
          onChange={this.onChange}
          style={{"width": "160px"}}
          defaultValue={moment(leaveUniversity, monthFormat)}
          format={monthFormat}
          getCalendarContainer={() => this.leaveUniversity}
          allowClear={false}
        />
      </div>
    )
  }
}
