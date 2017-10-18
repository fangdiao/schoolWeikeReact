import { createAction } from 'redux-actions';
import { request } from 'utils/helper';

export default {
  //老师发布的项目
  'teacherAllProject': createAction('ALL_PROJECT', reqData => request('/WeiKe/teacher/allProject', reqData, 'get', true), reqData => reqData),
  //学生发布的项目
  'studentAllProject': createAction('ALL_PROJECT', reqData => request('/WeiKe/student/allProject', reqData, 'get', true), reqData => reqData),
  //我的申请
  'joinProject': createAction('JOIN_PROJECT', reqData => request('/WeiKe/getApplyProDetail', reqData, 'get', true), reqData => reqData),
  //我的关注
  'followPros': createAction('FOLLOW_PROS', reqData => request('/WeiKe/followPros', reqData, 'get', true), reqData => reqData),
  //取消关注
  'userCancleAttention': createAction('USER_CANCLE_ATTENTION', reqData => request('/WeiKe/unFollowPro', reqData, 'post', true), reqData => reqData),
  //获取站内信
  'message': createAction('MESSAGE', reqData => request('/WeiKe/messageList', reqData, 'get', true), reqData => reqData),
  //删除站内信
  'deleteMessage': createAction('DELETE_MESSAGE', reqData => request('/WeiKe/deleteMessage', reqData, 'post', true), reqData => reqData),
  //删除项目
  'deleteProject': createAction('DELETE_PROJECT', reqData => request('/WeiKe/deletePro/', reqData, 'post', true), reqData => reqData),
  //查看项目人员
  'projectsUser': createAction('PROJECTS_USER', reqData => request('/WeiKe/projectName', reqData, 'get', true), reqData => reqData),
  //同意申请
  'agree': createAction('AGREE', reqData => request('/WeiKe/acceptApply', reqData, 'post', true), reqData => reqData),
  //拒绝申请
  'refuse': createAction('REFUSE', reqData => request('/WeiKe/refuseApply', reqData, 'post', true), reqData => reqData),
  //获取项目详情
  'projectsDetails': createAction('PROJECTS_DETAILS', reqData => request('/WeiKe/projectName', reqData, 'get', true), reqData => reqData),
  //老师发布项目
  'teacherRePro': createAction('RE_PRO', reqData => request('/WeiKe/teacher/addProject', reqData, 'post', true), reqData => reqData),
  //学生发布项目
  'studentRePro': createAction('RE_PRO', reqData => request('/WeiKe/student/addProject', reqData, 'post', true), reqData => reqData),
  //修改项目
  'changePro': createAction('CHANGE_PRO', reqData => request('/WeiKe/updatePro', reqData, 'post', true), reqData => reqData),
};
