import { handleActions } from 'redux-actions';
import { range } from 'utils/helper';

const initialState = {
  projects: []
};

export default handleActions({
  'INDEX_PROJECTS': (state, action) => {
    if (!action.error) {
      let projects = action.payload.data;
      state = { ...state, projects };
      return state;
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
  //搜索和推荐
  'SEARCH_RECOMMEND': (state, action) => {
    if (!action.error) {
      let { data } = action.payload;
      if (data) {
        let newState = state;
        let { projects } = newState;
        projects = [ ...data ];
        newState = { ...newState, projects };
        return newState;
      }
    }
    return state;
  },
}, initialState)
