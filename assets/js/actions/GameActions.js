import { Games } from '../api'
import { currentPlayerSet } from './index'

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

export const advanceToNextRound = (gameId, currentRound) => {
  return dispatch => {
    Games.nextRound(gameId, currentRound)
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

export const fetchGameSummary = (gameId) => {
  return dispatch => {
    Games.summary(gameId)
      .then(response => {
        console.log(response)
        // dispatch(summaryReceived(response.data))
      })
  }
}

export const roundChanged = (ordinality) => ({
  type: 'ROUND_CHANGED',
  ordinality: ordinality
})