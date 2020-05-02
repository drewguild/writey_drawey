import React, { useState, Children } from 'react'
import { useSelector } from 'react-redux'

function TabPanel(props) {
  const { children, value, index } = props

  return (
    <div hidden={value !== index}>
      {children}
    </div>
  )
}

function EndGamePage() {
  const currentPlayerId = useSelector(state => state.player.currentPlayer)
  const players = useSelector(state => state.player.players)
  const [value, setValue] = useState(currentPlayerId)

  return (
    <div>
      <div value={value} >
        {players.map((player) => {
          return (
            <button
              key={player.id}
              value={player.id}
              onClick={() => setValue(player.id)}
            >
              {player.name}
            </button>)
        })}
      </div>
      {players.map((player) => {
        return (<TabPanel value={value} index={player.id} key={player.id}>
          <p>{player.name}</p>
        </TabPanel>)
      })}
    </div>
  )
}

export default EndGamePage