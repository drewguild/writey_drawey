import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function TabPanel(props) {
  const { children, value, index } = props

  return (
    <div hidden={value !== index}>
      {children}
    </div>
  )
}

function EndSequences(props) {
  const sequences = useSelector(state => state.summary.sequences)
  // TODO: enhancement, initial state should probably match player's first prompt
  const [value, setValue] = useState(sequences[0].initial)

  return (
    <div>
      <div value={value} >
        {sequences.map((sequence) => {
          const initial = sequence.initial

          return (
            <button
              key={initial}
              value={initial}
              onClick={() => setValue(initial)}
            >
              {initial}
            </button>)
        })}
      </div>
      {sequences.map((sequence) => {
        const initial = sequence.initial

        return (<TabPanel value={value} index={initial} key={initial}>
          <p>{initial}</p>
        </TabPanel>)
      })}
    </div>
  )

}

export default EndSequences;