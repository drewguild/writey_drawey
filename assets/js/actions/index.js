// Game Action Creators
export const gameReceived = (id, code) => ({
  type: 'GAME_RECEIVED',
  game_id: id,
  code: code
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