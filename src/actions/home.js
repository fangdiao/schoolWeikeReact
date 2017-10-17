import { createAction } from 'redux-actions';
import { request } from 'utils/helper';

export default {
  //获取首页项目
  'indexProjects': createAction('INDEX_PROJECTS', reqData => request('/WeiKe/index', reqData, 'get', true), reqData => reqData),
  //关注项目
  'attention': createAction('ATTENTION', reqData => request('/WeiKe/followPro', reqData, 'post', true), reqData => reqData),
  //取消关注
  'cancleAttention': createAction('CANCLE_ATTENTION', reqData => request('/WeiKe/unFollowPro', reqData, 'post', true), reqData => reqData),
  //申请项目
  'join': createAction('JOIN', reqData => request('/WeiKe/sendMessage', reqData, 'post', true), reqData => reqData),
  //排序
  'range': createAction('RANGE', reqData => reqData),
  //查看关注
  'attentionProjects': createAction('ATTENTION_PROJECTS', reqData => request('/WeiKe/followPros', reqData, 'post', true), reqData => reqData),
  //获取项目详情
  'projectsDetails': createAction('PROJECTS_DETAILS', reqData => request('/WeiKe/projectName', reqData, 'get', true), reqData => reqData),
  //搜索
  'search': createAction('SEARCH_RECOMMEND', reqData => request('/WeiKe/projectsByWords', reqData, 'get', true), reqData => reqData),
  //推荐
  'recommend': createAction('SEARCH_RECOMMEND', reqData => request('/WeiKe/student/getRecommend', reqData, 'get', true), reqData => reqData),
  //查看学生信息
  'studentMs': createAction('STUDENT_MS', reqData => request('/WeiKe/student/otherStudentData', reqData, 'get', true), reqData => reqData),
  //查看老师信息
  'teacherMs': createAction('TEACHER_MS', reqData => request('/WeiKe/teacher/otherTeacherData', reqData, 'get', true), reqData => reqData),
};
