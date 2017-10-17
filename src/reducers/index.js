import { combineReducers } from 'redux';
import home from './home';
import login from './login';
import userProjects from './userProjects';
export default combineReducers({
  home,
  login,
  userProjects,
});
