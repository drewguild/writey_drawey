import { Players } from '../api'

// Player Action Creators
export const currentPlayerSet = (id) => ({
  type: 'CURRENT_PLAYER_SET',
  player_id: id
});

export const changePlayerStatus = (playerId, status) => {
  return dispatch => {
    Players.update(playerId, { status: status })
      .then(response => {
        dispatch(playerReceived(response.data))
      })
  }
}

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