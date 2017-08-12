import { handleActions } from 'redux-actions';
import { message } from 'antd';

const initialState = {
  user: {}
};

export default handleActions({
  'STUDENT_LOGIN': (state, action) => {
    if (!action.error) {
      let user = action.payload.data
      localStorage.weike = JSON.stringify(user);
      state = { ...state, user };
      return state
    }
    return state;
  },
  'LOGIN_WITH_STORAGE': (state, action) => {
    if (!action.error) {
      let user = action.payload;
      state = { ...state, user };
      return state
    }
    return state;
  },
  'LOG_OUT': (state, action) => {
    if (!action.error) {
      localStorage.removeItem('weike');
      let user = {};
      state = { ...state, user };
      return state
    }
    return state;
  },
  'GET_EMAIL_CODE': (state, action) => {
    if (!action.error) {
      if (action.payload.data.success) {
        message.info('验证码已发送到您的邮箱，请您注意查收');
      }
      return state
    }
    return state;
  }
}, initialState)
