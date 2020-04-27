import { Games, Players } from "../api";

// Game Action Creators
export const gameReceived = (id, code) => ({
  type: 'GAME_RECEIVED',
  game_id: id,
  code: code
})

export const addPlayer = (gameCode, playerName) => {
  return dispatch => {
    Games.addPlayer(gameCode, playerName)
      .then(response => {
        dispatch(currentPlayerSet(response.data.players[0]))
        dispatch(gameReceived(response.data.game_id, response.data.game_code))
      })
  }
}

export const beginRound = (gameId) => {
  return dispatch => {
    Games.firstRound(gameId)
      .then(response => {
        dispatch(roundChanged(response.data.ordinality))
      })
  }
}

export const createGame = (playerName) => {
  return dispatch => {
    Games.create(playerName)
      .then(response => {
        dispatch(currentPlayerSet(response.data.players[0]))
        dispatch(gameReceived(response.data.game_id, response.data.game_code))
      })
  }
}

export const roundChanged = (ordinality) => ({
  type: 'ROUND_CHANGED',
  ordinality: ordinality
})

// Player Action Creators
export const currentPlayerSet = (id) => ({
  type: 'CURRENT_PLAYER_SET',
  player_id: id
});

export const fetchPlayers = (gameId) => {
  return dispatch => {
    Players.forGame(gameId)
      .then(response => {
        _.map(response.data, (player) => {
          dispatch(playerReceived(player))
        })
      })
  }
}

export const playerReceived = ({ id, name, status }) => ({
  type: 'PLAYER_RECEIVED',
  player_id: id,
  name: name,
  status: status
})

export const playerUpdated = ({ id, name, status }) => ({
  type: 'PLAYER_UPDATED',
  player_id: id,
  name: name,
  status, status
})

// Prompt Action Creators
export const promptExpired = () => ({
  type: 'PROMPT_EXPIRED'
})

export const promptReceived = (id, text) => ({
  type: 'PROMPT_RECEIVED',
  prompt_id: id,
  text: text
});


// Timer Action Creators
export const timeExpired = () => ({
  type: 'TIME_EXPIRED'
});

export const timerRemoved = () => ({
  type: 'TIMER_REMOVED'
})