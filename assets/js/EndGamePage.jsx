import React, { useState, Children } from 'react'

function TabPanel(props) {
  const { children, value, index } = props

  return (
    <div hidden={value !== index}>
      {children}
    </div>
  )
}

function EndGamePage() {
  const [value, setValue] = useState(0)

  return (
    <div>
      <div value={value} >
        <button value={0} onClick={() => setValue(0)}>Robbo</button>
        <button value={1} onClick={() => setValue(1)}>Tommo</button>
        <button value={2} onClick={() => setValue(2)}>Johnno</button>
        <button value={3} onClick={() => setValue(3)}>Oporto</button>
      </div>
      <TabPanel value={value} index={0} >
        <p>Robbo</p>
      </TabPanel>
      <TabPanel value={value} index={1} >
        <p>Tommo</p>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <p>Johnno</p>
      </TabPanel>
      <TabPanel value={value} index={3} >
        <p>Oporto</p>
      </TabPanel>
    </div>
  )
}

export default EndGamePage