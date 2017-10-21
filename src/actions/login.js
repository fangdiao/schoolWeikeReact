import { createAction } from 'redux-actions';
import { request } from 'utils/helper';
import { requestImg } from 'utils/helper';
import { requestLoginIn } from 'utils/helper';

export default {
  //localstorage自动登录
  'loginWithToken': createAction('LOGIN_WITH_TOKEN', reqData => request('/WeiKe/loginByToken', reqData, 'post', true), reqData => reqData),
  //学生登录
  'studentLogin': createAction('LOGIN', reqData => requestLoginIn('/weike/student/login', reqData), reqData => reqData),
  //老师登录
  'teacherLogin': createAction('LOGIN', reqData => requestLoginIn('/weike/teacher/login', reqData), reqData => reqData),
  //退出登录
  'logOut': createAction('LOG_OUT'),
  //获取图片验证码
  'getImgCode': createAction('GET_IMG_CODE', reqData => requestImg('/weike/getVerifyCode'), reqData => reqData),
  //老师获取邮箱验证码
  'teacherEmailCode': createAction('EMAIL_CODE', reqData => request('/weike/teacher/GetVerifyCodeForRegister', reqData), reqData => reqData),
  //学生获取邮箱验证码
  'studentEmailCode': createAction('EMAIL_CODE', reqData => request('/weike/student/GetVerifyCodeForRegister', reqData), reqData => reqData),
  //学生注册
  'studentRegister': createAction('REGISTER', reqData => request('/weike/student/register', reqData, 'post'), reqData => reqData),
  //老师注册
  'teacherRegister': createAction('REGISTER', reqData => request('/weike/teacher/register', reqData, 'post'), reqData => reqData),
  //学生修改密码邮箱验证码
  'studentChangePWEmailCode': createAction('STUDENT_CHANGE_PW_EMAIL_CODE', reqData => request('/weike/student/getVerifyCodeForFindPassword', reqData), reqData => reqData),
  //老师修改密码邮箱验证码
  'teacherChangePWEmailCode': createAction('TEACHER_CHANGE_PW_EMAIL_CODE', reqData => request('/weike/teacher/getVerifyCodeForFindPassword', reqData), reqData => reqData),
  //学生修改密码
  'studentChangePW': createAction('CHANGE_PW', reqData => request('/weike/student/FindPassword', reqData, 'post'), reqData => reqData),
  //老师修改密码
  'teacherChangePW': createAction('CHANGE_PW', reqData => request('/weike/teacher/FindPassword', reqData, 'post'), reqData => reqData),
  //学生提交详细信息
  'studentInfo': createAction('INFO', reqData => request('/WeiKe/student/addPersonalDeail', reqData, 'post', true), reqData => reqData),
  //老师提交详细信息
  'teacherInfo': createAction('INFO', reqData => request('/WeiKe/teacher/addPersonal', reqData, 'post', true), reqData => reqData),
  //学生修改详细信息
  'studentChangeInfo': createAction('CHANGE_INFO', reqData => request('/WeiKe/student/updateInfo', reqData, 'post', true), reqData => reqData),
  //老师修改详细信息
  'teacherChangeInfo': createAction('CHANGE_INFO', reqData => request('/WeiKe/teacher/updateInfo', reqData, 'post', true), reqData => reqData),
  //老师获取个人信息
  'teacherPersonalData': createAction('PERSONAL_DATA', reqData => request('/WeiKe/teacher/personalData', reqData, 'get', true), reqData => reqData),
  //学生获取个人信息
  'studentPersonalData': createAction('PERSONAL_DATA', reqData => request('/WeiKe/student/personalData', reqData, 'get', true), reqData => reqData),
  //老师上传的修改头像
  'studentUpImg': createAction('PERSONAL_DATA', reqData => request('/WeiKe/teacher/uploadImage', reqData, 'post', true, true), reqData => reqData),
  //学生上传修改头像
  'teacherUpImg': createAction('PERSONAL_DATA', reqData => request('/WeiKe/student/uploadImage', reqData, 'post', true, true), reqData => reqData),
}
