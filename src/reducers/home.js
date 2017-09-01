import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { range } from 'utils/helper';

const initialState = {
  projects: []
};

export default handleActions({
  'INDEX_PROJECTS': (state, action) => {
    if (!action.error) {
      let { projects } = action.payload.data;
      state = { ...state, projects };
      return state;
    }
    return state;
  },
  //关注项目
  'ATTENTION': (state, action) => {
    if (!action.error && action.payload.data.success) {
      let newState = state;
      let { projectName, username } = action.meta;
      let projects = newState.projects.filter(item => {
        if (item.projectName === projectName) {
          item.attention = [ ...item.attention, username ]
        }
        return item;
      });
      newState = { ...newState, projects };
      return newState;
    }
    return state;
  },
  //取消关注项目
  'CANCLE_ATTENTION': (state, action) => {
    if (!action.error && action.payload.data.success) {
      let newState = state;
      let { projectName, username } = action.meta;
      let projects = newState.projects.filter(item => {
        if (item.projectName === projectName) {
          item.attention = _.remove(item.attention, n => n !== username);
        }
        return item;
      });
      newState = { ...newState, projects };
      return newState;
    }
    return state;
  },
  //申请项目
  'JOIN': (state, action) => {
    if (!action.error && action.payload.data.success) {
      let newState = state;
      let { projectName, username } = action.meta;
      let projects = newState.projects.filter(item => {
        if (item.projectName === projectName) {
          item.joining = [ ...item.joining, username ]
        }
        return item;
      });
      newState = { ...newState, projects };
      return newState;
    }
    return state;
  },
  //排序
  'RANGE': (state, action) => {
    if (!action.error) {
      let { type, skills } = action.payload;
      let { projects } = state;
      projects = skills ? range(projects, type, skills) : range(projects, type);
      state = { ...state, projects }
      return state;
    }
    return state;
  },
}, initialState)
