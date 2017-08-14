import { createAction } from 'redux-actions';
import { request } from 'utils/helper';
export default {
  //localstorage自动登录
  'loginWithStorage': createAction('LOGIN_WITH_STORAGE'),
  //登录
  'login': createAction('LOGIN', reqData => request('/weike/login', reqData, 'post'), reqData => reqData),
  //退出登录
  'logOut': createAction('LOG_OUT'),
  //获取图片验证码
  'getImgCode': createAction('GET_IMG_CODE', reqData => request('/weike/getImgCode', reqData), reqData => reqData),
  //获取邮箱验证码
  'getEmailCode': createAction('GET_EMAIL_CODE', reqData => request('/weike/getEmailCode', reqData, 'post'), reqData => reqData),
  //学生注册
  'studentRegister': createAction('STUDENT_REGISTER', reqData => request('/weike/student/register', reqData, 'post'), reqData => reqData),
  //老师注册
  'teacherRegister': createAction('TEACHER_REGISTER', reqData => request('/weike/teacher/register', reqData, 'post'), reqData => reqData),
  //修改密码邮箱验证
  'PWMailTest': createAction('PW_MAIL_TEST', reqData => request('weike/PWMailTest', reqData, 'post'), reqData => reqData),
  //修改密码
  'changePW': createAction('CHANGE_PW', reqData => request('/weike/changePW', reqData, 'post'), reqData => reqData),
}
