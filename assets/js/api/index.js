import axios from 'axios'

export const Drawings = {
  create: (drawingData, gameId, playerId, round) =>
    axios.post("/api/drawings",
      {
        drawing_base64: drawingData,
        game_id: gameId,
        player_id: playerId,
        round: round
      }
    ),
  get: (playerId, round) =>
    axios.get(`/api/drawings/next?player_id=${playerId}&round=${round}`)
}

export const Games = {
  addPlayer: (gameCode, playerName) =>
    axios.put(`/api/games/${gameCode}`, { player_name: playerName }),
  create: (playerName) =>
    axios.post("/api/games", { initial_player_name: playerName }),
  firstRound: (gameId) =>
    axios.get(`api/games/${gameId}/rounds`),
  nextRound: (gameId, currentRound) =>
    axios.get(`api/games/${gameId}/rounds?current_round=${currentRound}`),
  roundStatus: (gameId, round) =>
    axios.get(`api/games/${gameId}/rounds/complete?round=${round}`),
  summary: (gameId) =>
    axios.get(`api/games/${gameId}/summary`)
}

export const Players = {
  forGame: (gameId) =>
    axios.get(`/api/games/${gameId}/players`),
  update: (playerId, options) =>
    axios.put(`/api/players/${playerId}`, options)
}

export const Prompts = {
  create: (text, gameId, playerId, round) =>
    axios.post("/api/prompts", { text: text, game_id: gameId, player_id: playerId, round: round }),
  next: (playerId, round) =>
    axios.get(`/api/prompts/next?player_id=${playerId}&round=${round}`),
  random: (gameId, playerId) =>
    axios.get(`/api/prompts/random?game_id=${gameId}&player_id=${playerId}`)
}