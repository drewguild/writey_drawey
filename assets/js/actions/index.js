export * from './GameActions'
export * from './PlayerActions'

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