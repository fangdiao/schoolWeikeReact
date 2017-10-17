import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Row, Col } from 'antd';

import userProjectsActions from 'actions/userProjects';
import { connect } from 'utils/helper';

import STYLE from './style';

const dateFormat = 'YYYY-MM-DD';

class MessageItem extends  React.Component {

  delete = () => {
    let { id, actions: { deleteMessage } } = this.props;
    deleteMessage({ id });
  }

  render() {
    let { createDate, content, fromName, projectAbout } = this.props;
    return (
      <div className={STYLE.messageItem}>
       <Row>
         <Col span={21}>
           <p>
             <span><i className="iconfont icon-calendar"></i>{moment(createDate).format(dateFormat)}</span>
             <span>
               <Link to={`/details/${projectAbout}`} target="_blank">
                 <i className="iconfont icon-file-text-o"></i>{projectAbout}
               </Link>
             </span>
             <span><i className="iconfont icon-user"></i>{`来自: ${fromName}`}</span>
           </p>
           <p>{content}</p>
         </Col>
         <Col span={3}>
           <span onClick={this.delete} className={STYLE.delete}>
             <i className="iconfont icon-cut"></i>
           </span>
         </Col>
       </Row>
      </div>
    )
  }
}
export default connect(state => state.userProjects, userProjectsActions)(MessageItem);