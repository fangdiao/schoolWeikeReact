import { createAction } from 'redux-actions';
import { request } from 'utils/helper';

export default {
  //获取首页项目
  'indexProjects': createAction('INDEX_PROJECTS', reqData => request('/WeiKe/index', reqData, 'get', true), reqData => reqData),
  //关注项目
  'attention': createAction('ATTENTION', reqData => request('/Weike/attention', reqData, 'post', true), reqData => reqData),
  //取消关注
  'cancleAttention': createAction('CANCLE_ATTENTION', reqData => request('/Weike/cancleAttention', reqData, 'post', true), reqData => reqData),
  //申请项目
  'join': createAction('JOIN', reqData => request('/Weike/join', reqData, 'post', true), reqData => reqData),
  //排序
  'range': createAction('RANGE', reqData => reqData),
};
