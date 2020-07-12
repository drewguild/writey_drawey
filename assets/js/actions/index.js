import { Prompts } from '../api'

export * from './GameActions'
export * from './PlayerActions'

// Prompt Action Creators
export const fetchRandomPrompt = (gameId, playerId) => {
  return dispatch => {
    Prompts.random(gameId, playerId)
      .then((response) => {
        dispatch(promptReceived(response.data.id, response.data.prompt))
      })
  }
}

export const fetchNextPrompt = (playerId, round) => {
  return dispatch => {
    Prompts.next(playerId, round)
      .then((response) => {
        dispatch(promptReceived(response.data.id, response.data.prompt))
      })
  }
}

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