import { combineReducers } from 'redux';
import _ from 'lodash';

const error = (state = { message: null }, action) => {
  switch(action.type) {
    case "ERROR_RECEIVED":
      return { message: action.message}
    default:
      return state;
  }
}

const game = (state = { id: null, code: null, round: null }, action) => {
  switch (action.type) {
    case 'GAME_RECEIVED':
      return Object.assign({}, state, { ...state, id: action.game_id, code: action.code })
    case 'ROUND_CHANGED':
      return { ...state, round: action.ordinality }
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
    case 'PROMPT_EXPIRED':
      return Object.assign({}, state, { id: null, text: null })
    case 'PROMPT_RECEIVED':
      return Object.assign({}, state, { id: action.prompt_id, text: action.text })
    default:
      return state;
  }
};

const summary = (state = { sequences: [{ initial: null, entries: [] }] }, action) => {
  switch (action.type) {
    case 'SUMMARY_RECEIVED':
      return { sequences: action.sequences }
    default:
      return state
  }
}

const timer = (state = { expired: false }, action) => {
  switch (action.type) {
    case 'TIME_EXPIRED':
      return Object.assign({}, state, { expired: true });
    case 'TIMER_REMOVED':
      return Object.assign({}, state, { expired: false })
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  error,
  game,
  player,
  prompt,
  summary,
  timer
});

export default rootReducer;