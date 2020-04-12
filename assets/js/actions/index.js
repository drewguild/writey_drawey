// Game Action Creators
export const gameReceived = (id, code) => ({
  type: 'GAME_RECEIVED',
  game_id: id,
  code: code
})

// Player Action Creators
export const currentPlayerSet = (id) => ({
  type: 'CURRENT_PLAYER_SET',
  player_id: id
});

export const playerReceived = (id, name) => ({
  type: 'PLAYER_RECEIVED',
  player_id: id,
  name: name
})

// Prompt Action Creators
export const promptReceived = (id, text) => ({
  type: 'PROMPT_RECEIVED',
  prompt_id: id,
  text: text
});

// Timer Action Creators
export const timeExpired = () => ({
  type: 'TIME_EXPIRED'
});