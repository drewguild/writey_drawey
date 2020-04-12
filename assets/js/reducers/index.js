import { combineReducers } from 'redux';
import _ from 'lodash';

const game = (state = { id: null, code: null }, action) => {
  switch (action.type) {
    case 'GAME_RECEIVED':
      return Object.assign({}, state, { id: action.game_id, code: action.code })
    default:
      return state;
  }
}

const player = (state = { currentPlayer: null, ids: [], players: [] }, action) => {
  switch (action.type) {
    case 'CURRENT_PLAYER_SET':
      return Object.assign({}, state, { currentPlayer: action.player_id })
    case 'PLAYER_RECEIVED':
      if (_.includes(state.ids, action.player_id)) {
        return Object.assign(
          {},
          state,
          {
            players: _.map(state.players, (player) => {
              if (player.id !== action.player_id) {
                return player
              }

              return { id: action.player_id, name: action.name, status: action.status }
            })
          }
        )
      }
      return {
        currentPlayer: state.currentPlayer,
        ids: [...state.ids, action.player_id],
        players: [
          ...state.players,
          { id: action.player_id, name: action.name, status: action.status }
        ]
      }
    case 'PLAYER_UPDATED':
      return Object.assign(
        {},
        state,
        {
          players: _.map(state.players, (player) => {
            if (player.id !== action.player_id) {
              return player
            }

            return { id: action.player_id, name: action.name, status: action.status }
          })
        }
      )
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