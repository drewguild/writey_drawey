import { combineReducers } from 'redux';

const timer = (state = { expired: false }, action) => {
  switch (action.type) {
    case 'TIME_EXPIRED':
      return Object.assign({}, state, { expired: true });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  timer
});

export default rootReducer;