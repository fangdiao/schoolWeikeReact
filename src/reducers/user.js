import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({
  'TEST': (state, action) => {
    if (!action.error) {
      let test = '123';
      state = { ...state, test };
      return state
    }
    return state;
  }
}, initialState)
