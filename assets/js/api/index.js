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
    )
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
    axios.get(`api/games/${gameId}/rounds/complete?round=${round}`)
}

export const Players = {
  forGame: (gameId) =>
    axios.get(`/api/games/${gameId}/players`),
  update: (playerId, options) =>
    axios.put(`/api/players/${playerId}`, options)
}

export const Prompts = {
  next: (playerId, round) =>
    axios.get(`/api/prompts/next?player_id=${playerId}&round=${round}`),
  random: () =>
    axios.get("/api/prompts/random")
}