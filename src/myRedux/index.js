export function createStore(reducer) {
  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach(fn => fn())
    return action
  }
  dispatch({type: '@@redux/INIT'})
  return {
    getState,
    subscribe,
    dispatch
  }
} 