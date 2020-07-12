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
          <h3>{initial}</h3>

          {sequence.entries.map((entry, index) => {
            if (entry.type == 'DRAWING') {
              return <img src={entry.value} key={index} />
            } else {
              return <h3 key={index}>{entry.value}</h3>
            }
          })}
        </TabPanel>)
      })}
    </div>
  )

}

export default EndSequences;