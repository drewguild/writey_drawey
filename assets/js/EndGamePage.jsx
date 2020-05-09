import React, { useState, Children } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchGameSummary } from './actions'
import EndSequences from './EndSequences.jsx'

function EndGamePage() {
  const dispatch = useDispatch()

  const gameId = useSelector(state => state.game.id)
  dispatch(fetchGameSummary(gameId))


  return (
    <EndSequences />
  )
}

export default EndGamePage