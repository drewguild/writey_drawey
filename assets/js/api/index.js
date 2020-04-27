import axios from 'axios'

export const Games = {
  firstRound: (gameId) =>
    axios.get(`api/games/${gameId}/rounds`)
}

export const Players = {
  forGame: (gameId) =>
    axios.get(`/api/games/${gameId}/players`)
}