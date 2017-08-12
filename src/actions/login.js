import { createAction } from 'redux-actions';
import { request } from 'utils/helper';
export default {
  //localstorage自动登录
  'loginWithStorage': createAction('LOGIN_WITH_STORAGE'),
  //学生登录
  'studentLogin': createAction('STUDENT_LOGIN', reqData => request('/weike/student/login', reqData, 'post'), reqData => reqData),
  //退出登录
  'logOut': createAction('LOG_OUT'),
  //获取邮箱验证码
  'getEmailCode': createAction('GET_EMAIL_CODE', reqData => request('/weike/getEmailCode', reqData, 'post'), reqData => reqData)
}
