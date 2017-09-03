import React from 'react';

import classnames from 'classnames';
import { DatePicker } from 'antd';
import moment from 'moment';

import STYLE from './style';

const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY/MM';

export default class EntryUniverity extends React.Component {

  onChange = (value) => {
    let { toParent } = this.props;
    toParent({ entryUniversity: value.valueOf() });
  }

  render() {
    let { entryUniversity } = this.props;
    entryUniversity = moment(entryUniversity).format(monthFormat);
    return (
      <div className={classnames(STYLE.date, STYLE.item)} ref={ele => this.entryUniversity = ele}>
        <span>入学时间</span>
        <MonthPicker
          onChange={this.onChange}
          style={{"width": "160px"}}
          defaultValue={moment(entryUniversity, monthFormat)}
          format={monthFormat}
          getCalendarContainer={() => this.entryUniversity}
          allowClear={false}
        />
      </div>
    )
  }
}
