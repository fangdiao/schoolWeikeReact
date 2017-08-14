import { handleActions } from 'redux-actions';
import { message } from 'antd';
import { hashHistory } from 'react-router';

const initialState = {
  user: {}
};

export default handleActions({
  //登录
  'LOGIN': (state, action) => {
    if (!action.error) {
      let user = action.payload.data
      localStorage.weike = JSON.stringify(user);
      state = { ...state, user };
      message.success('登录成功');
      const jump = () => hashHistory.push('/');
      setTimeout(jump, 2000);
      
      return state
    }
    return state;
  },
  //localstorage自动登录
  'LOGIN_WITH_STORAGE': (state, action) => {
    if (!action.error) {
      let user = action.payload;
      state = { ...state, user };
      return state
    }
    return state;
  },
  //退出登录
  'LOG_OUT': (state, action) => {
    if (!action.error) {
      localStorage.removeItem('weike');
      let user = {};
      state = { ...state, user };
      return state
    }
    return state;
  },
  //邮箱验证码
  'GET_EMAIL_CODE': (state, action) => {
    if (!action.error) {
      if (action.payload.data.success) {
        message.info('验证码已发送到您的邮箱，请您注意查收');
      }
      return state
    }
    return state;
  },
  //图片验证码
  'GET_IMG_CODE': (state, action) => {
    if (!action.error) {
      let { imgCode } = action.payload.data;
      state = { ...state, imgCode };
      return state;
    }
    return state;
  },
  //学生注册
  'STUDENT_REGISTER': (state, action) => {
    if (!action.error) {
      if (action.payload.data.success) {
        message.success('注册成功,请登录');
        const jump = () => hashHistory.push('/login/loginIn');
        setTimeout(jump, 2000);
      }
      return state
    }
    return state;
  },
  //老师注册
  'TEACHER_REGISTER': (state, action) => {
    if (!action.error) {
      if (action.payload.data.success) {
        message.success('注册成功，请登录');
        const jump = () => hashHistory.push('/login/loginIn');
        setTimeout(jump, 2000);
      }
      return state
    }
    return state;
  }
}, initialState)
