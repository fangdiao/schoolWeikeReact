import { handleActions } from 'redux-actions';
import { message } from 'antd';
import { hashHistory } from 'react-router';

const initialState = {
  user: {},
};

export default handleActions({
  //学生老师登录
  LOGIN: (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (!ifSuccess) {
        message.destroy();
        message.error(msg);
      } else {
        let user = action.payload.data;
        let { completed } = user;
        let path = completed ? '/dist' : '/user/info';
        let { token } = user
        localStorage.weike = JSON.stringify({ token });
        state = { ...state, user };
        hashHistory.push(path);
        return state;
      }
    }

    return state;
  },
  //token登录
  LOGIN_WITH_TOKEN: (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (!ifSuccess) {
        message.destroy();
        message.error(msg);
      } else {
        let user = action.payload.data;
        let { completed } = user;
        if (!completed) {
          hashHistory.push('/user/info');
        }
        state = { ...state, user };
        return state;
      }
    }

    return state;
  },
  //退出登录
  LOG_OUT: (state, action) => {
    if (!action.error) {
      localStorage.removeItem('weike');
      let user = {};
      state = { ...state, user };
      hashHistory.push('/login/loginIn');
      return state;
    }

    return state;
  },

  //图片验证码
  GET_IMG_CODE: (state, action) => {
    if (!action.error) {
      let { msg, captchaCode } = action.payload;
      state = { ...state, msg, captchaCode };
      return state;
    }

    return state;
  },
  //学生老师填写详细信息
  INFO: (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (ifSuccess) {
        let { image, skills } = action.meta;
        let completed = true;
        let { user } = state;
        user = { ...user, image, skills, completed };
        state = { ...state, user };
        hashHistory('/');
        return state;
      } else {
        message.destroy();
        message.error(msg);
      }

      return state;
    }

    return state;
  },

  //学生老师修改详细信息
  CHANGE_INFO: (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (ifSuccess) {
        let { image, skills } = action.meta;
        let { user } = state;
        user = { ...user, image, skills };
        state = { ...state, user };
        return state;
      } else {
        message.destroy();
        message.error(msg);
      }

      return state;
    }

    return state;
  },

  //老师学生获取个人信息
  PERSONAL_DATA: (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg, data } = action.payload;
      if (ifSuccess) {
        let { user } = state;
        user = { ...user, ...data };
        state = { ...state, user };
        return state;
      } else {
        message.destroy();
        message.error(msg);
      }
    }

    return state;
  },
}, initialState);
