import { handleActions } from 'redux-actions';
import { message } from 'antd';
import { hashHistory } from 'react-router';
import { jump } from 'utils/helper';

const initialState = {
  user: {}
};

export default handleActions({
  //学生老师登录
  'LOGIN': (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (!ifSuccess) {
        message.destroy();
        message.error(msg);
      } else {
        let { completed } = action.payload.data;
        let path = completed ? '/' : '/user/info';
        let user = action.payload.data;
        localStorage.weike = JSON.stringify(user);
        state = { ...state, user };
        jump(path, '登录成功');
        return state;
      }
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
      hashHistory.push('/login/loginIn');
      return state
    }
    return state;
  },
  //学生老师邮箱验证码
  'EMAIL_CODE': (state, action) => {
    if (!action.error) {
      if (action.payload.ifSuccess) {
        message.info('验证码已发送到您的邮箱，请您注意查收');
      }
      return state
    }
    return state;
  },
  //图片验证码
  'GET_IMG_CODE': (state, action) => {
    if (!action.error) {
      let { msg, captchaCode } = action.payload;
      state = { ...state, msg, captchaCode };
      return state;
    }
    return state;
  },
  //学生老师注册
  'REGISTER': (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (ifSuccess) {
        jump('/login/loginIn', '注册成功,请登录');
      } else {
        message.destroy();
        message.info(msg);
      }
      return state
    }
    return state;
  },
  //学生老师修改密码
  'CHANGE_PW': (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (ifSuccess) {
        jump('/login/loginIn', '密码修改成功，请登录');
      } else {
        message.destroy();
        message.error(msg);
      }
      return state
    }
    return state;
  },
  //学生老师填写详细信息
  'INFO': (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (ifSuccess) {
        let { image, skills } = action.meta;
        let completed = true;
        let { user } = state;
        user = { ...user, image, skills, completed };
        localStorage.weike = JSON.stringify(user);
        state = { ...state, user };
        jump('/', '信息填写成功，即将跳转到首页');
        return state;
      } else {
        message.destroy();
        message.error(msg);
      }
      return state
    }
    return state;
  },
  //学生老师修改详细信息
  'CHANGE_INFO': (state, action) => {
    if (!action.error) {
      let { ifSuccess, msg } = action.payload;
      if (ifSuccess) {
        let { image, skills } = action.meta;
        let { user } = state;
        user = { ...user, image, skills };
        localStorage.weike = JSON.stringify(user);
        state = { ...state, user };
        return state;
      } else {
        message.destroy();
        message.error(msg);
      }
      return state
    }
    return state;
  },
  //老师学生获取个人信息
  'PERSONAL_DATA': (state, action) => {
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
}, initialState)
