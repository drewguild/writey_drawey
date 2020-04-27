import axios from 'axios'

export const Players = {
  forGame: (gameId) =>
    axios.get(`/api/games/${gameId}/players`)
}