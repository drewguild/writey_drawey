import { combineReducers } from 'redux';

const game = (state = { id: null, code: null }, action) => {
  switch (action.type) {
    case 'GAME_RECEIVED':
      return Object.assign({}, state, { id: action.game_id, code: action.code })
    default:
      return state;
  }
}

const player = (state = [], action) => {
  switch (action.type) {
    case 'PLAYER_RECEIVED':
      return [...state, { id: action.player_id, name: action.name }]
    default:
      return state;
  }
};

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
  game,
  player,
  prompt,
  timer
});

export default rootReducer;