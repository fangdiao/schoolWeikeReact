import React from 'react';
import { Row, Col, Avatar, Spin } from 'antd';
import { isEmpty } from 'lodash';

import Item from './Item';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';


import STYLE from './style';

class Teacher extends React.Component {

  state = {
    loading: true,
    data: {},
  }

  componentWillMount() {
    let { actions: { teacherMs }, params: { query } } = this.props;
    teacherMs({ username: query }).then(r => {
      let { data } = r.payload;
      this.setState({ data, loading: false });
    });
  }

  render() {
    let { loading, data } = this.state;
    let {
      username,
      sex,
      rank,
      university,
      academy,
      qq,
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
                    <Item type="职称" text={rank} />
                    <Item type="学校" text={university} />
                    <Item type="学院" text={academy} />
                    <Item type="QQ" text={qq} />
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
export default connect(state => state.home, homeActions)(Teacher);