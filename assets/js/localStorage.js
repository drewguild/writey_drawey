// From Dan Abramov https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export function loadState() {
  try {
    const serializedState = sessionStorage.getItem('state')

    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state)
    sessionStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore... for now
  }
}