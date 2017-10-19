import React from 'react';
import { Row, Col, Spin } from 'antd';
import { isEmpty } from 'lodash';

import CurdBox from 'components/FDCurd/CurdBox';
import RangeCurd from 'components/FDCurd/RangeCurd';
import UserCurd from 'components/FDCurd/UserCurd';
import Projects from './Projects';
import { connect } from 'utils/helper';
import homeActions from 'actions/home';

import STYLE from './style';

class Home extends React.Component {

  state = {
    hasResult: true,
    loading: true,
  }

  searchPro = (query) => {
    let { search } = this.props.actions;
    search({ keyWords: query }).then(r => {
      let { data } = r.payload;
      if (!isEmpty(data)) {
        this.setState({ hasResult: true, loading: false });
      } else {
        this.setState({ hasResult: false, loading: false });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    let prePathname = this.props.location.pathname;
    let { location: { pathname }, params: { query } } = nextProps;
    if (prePathname !== pathname) {
      this.getProject(pathname, query);
    }
    return;
  }

  getProject = (pathname, query) => {
    let { actions: { indexProjects, recommend } } = this.props;
    this.setState({ hasResult: true });
    const getRes = (r) => {
      let { ifSuccess } = r.payload;
      if (ifSuccess) {
        this.setState({ loading: false });
      }
    }
    this.setState({ loading: true });
    switch (true) {
      case /\/dist$/g.test(pathname):
        indexProjects().then(r => getRes(r));
        break;
      case /\/search/g.test(pathname):
        this.searchPro(query);
        break;
      case /\/recommend/g.test(pathname):
        recommend().then(r => getRes(r));
        break;
    }
  }

  componentWillMount() {
    let { pathname } = this.props.location;
    this.getProject(pathname);
  }

  render() {
    let { hasResult, loading } = this.state;
    let { projects } = this.props.data;
    return (
      <div className={STYLE.home}>
        <Row>
          <Col span={18}>
            <Spin spinning={loading}>
              <Projects  projects={projects} hasResult={hasResult}/>
            </Spin>
          </Col>
          <Col span={6}>
            <CurdBox>
              <RangeCurd />
              <UserCurd />
            </CurdBox>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(state => state.home, homeActions)(Home);
