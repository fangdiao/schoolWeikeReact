import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import './style';

const dateFormat = 'YYYY-MM-DD';

export default class extends React.Component {

  onChange = (value) => {
    let { toParent, type } = this.props;
    type[Object.keys(type)[0]] = value.valueOf();
    toParent(type);
  }

  render() {
    let { type, title } = this.props;
    let time = type[Object.keys(type)[0]]
    time = moment(time).format(dateFormat);
    return (
      <div className="FDInfo" ref={ele => this.timeBox = ele}>
        <span className="title">{title}</span>
        <DatePicker
          onChange={this.onChange}
          style={{"width": "160px"}}
          value={moment(time, dateFormat)}
          format={dateFormat}
          getCalendarContainer={() => this.timeBox}
          allowClear={false}
        />
      </div>
    )
  }
}
