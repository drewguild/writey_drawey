import { combineReducers } from 'redux';

const timer = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  timer
});

export default rootReducer;