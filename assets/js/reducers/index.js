import { combineReducers } from 'redux';

const prompt = (state = { id: null, text: null }, action) => {
  switch (action.type) {
    case 'PROMPT_RECEIVED':
      return Object.assign({}, state, { id: action.prompt_id, text: action.text })
    default:
      return state;
  }
};

const timer = (state = { expired: false }, action) => {
  switch (action.type) {
    case 'TIME_EXPIRED':
      return Object.assign({}, state, { expired: true });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  prompt,
  timer
});

export default rootReducer;