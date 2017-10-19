import React from 'react';
import { Row, Col, Avatar, Spin } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';

import SkillItem from './SkillItem';
import Item from './Item';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';

import STYLE from './style';

class Student extends React.Component {

  state = {
    loading: true,
    data: {},
  }

  componentWillMount() {
    let { actions: { studentMs }, params: { query } } = this.props;
    studentMs({ username: query }).then(r => {
      let { data } = r.payload;
      this.setState({ data, loading: false });
    });
  }

  render() {
    let { loading, data } = this.state;
    let {
      username,
      sex,
      eduBackgroud,
      university,
      majorAndGrade,
      skills,
      leaveUniversity,
      entryUniversity,
      qq,
      experience,
      selfFeel,
      image,
    } = data;
    return (
      <div className={STYLE.userBox}>
        <div className={STYLE.userDetails}>
          <Spin spinning={loading}>
            {
              isEmpty(data) ? null : (
                <Row>
                  <Col span={6}>
                    <div className={STYLE.userHead}>
                      <Avatar size="large" icon="user" shape="square"/>
                    </div>
                  </Col>
                  <Col span={18}>
                    <Item type="用户名" text={username} />
                    <Item type="性别" text={sex} />
                    <Item type="学历" text={eduBackgroud} />
                    <Item type="学校" text={university} />
                    <Item type="专业" text={majorAndGrade} />
                    <SkillItem skills={skills} />
                    <Item type="进校时间" text={moment(leaveUniversity).format('YYYY-MM-DD')} />
                    <Item type="毕业时间"  text={moment(entryUniversity).format('YYYY-MM-DD')} />
                    <Item type="QQ" text={qq} />
                    <Item type="项目经验" text={experience} />
                    <Item type="自我评价" text={selfFeel} />
                  </Col>
                </Row>
              )
            }
          </Spin>
        </div>
      </div>
    )
  }
}
export default connect(state => state.home, homeActions)(Student);