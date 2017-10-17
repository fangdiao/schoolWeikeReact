import { handleActions } from 'redux-actions';

const initialState = {
  attention: [],
  message: {
    fromMessages: [],
    toMessages: [],
  }
};

export default handleActions({
  'USER_CANCLE_ATTENTION': (state, action) => {
    if (!action.error) {
      let { projectName } = action.meta;
      let newState = state;
      let { attention } = newState;
      attention = attention.filter(item => item.projectName !== projectName);
      newState = { ...newState, attention };
      return newState;
    }
    return state;
  },
  'FOLLOW_PROS': (state, action) => {
    if (!action.error) {
      let newState = state;
      let attention = action.payload.data;
      newState = { ...newState, attention };
      return newState;
    }
    return state;
  },
  //获取站内信
  'MESSAGE': (state, action) => {
    if (!action.error) {
      let newState = state;
      let message = action.payload.data;
      newState = { ...newState, message };
      return newState;
    }
    return state;
  },
  //删除站内信
  'DELETE_MESSAGE': (state, action) => {
    if (!action.error) {
      let { id } = action.meta;
      let newState = state;
      let { message } = newState;
      let { fromMessages, toMessages } = message;
      console.log(fromMessages,toMessages )
      fromMessages = fromMessages.filter(item => item.id !== id);
      toMessages = toMessages.filter(item => item.id !== id);
      message = { fromMessages, toMessages };
      newState = { ...newState, message };
      return newState;
    }
    return state;
  },
  //获取我的发布
  'ALL_PROJECT': (state, action) => {
    if (!action.error) {
      let release = action.payload.data;
      state = { ...state, release };
      return state;
    }
    return state;
  },
  //删除我的发布
  'DELETE_PROJECT': (state, action) => {
    if (!action.error) {
      let { projectName } = action.meta;
      let newState = state;
      let { release } = newState;
      release = release.filter(item => item !== projectName);
      newState = { ...newState, release };
      return newState;
    }
    return state;
  },
}, initialState)
