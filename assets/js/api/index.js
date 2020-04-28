import axios from 'axios'

export const Games = {
  addPlayer: (gameCode, playerName) =>
    axios.put(`/api/games/${gameCode}`, { player_name: playerName }),
  create: (playerName) =>
    axios.post("/api/games", { initial_player_name: playerName }),
  firstRound: (gameId) =>
    axios.get(`api/games/${gameId}/rounds`)
}

export const Players = {
  forGame: (gameId) =>
    axios.get(`/api/games/${gameId}/players`),
  update: (playerId, options) =>
    axios.put(`/api/players/${playerId}`, options)
}