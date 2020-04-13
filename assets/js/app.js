// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers';
import { loadState, saveState } from './localStorage'

import DrawingPage from './DrawingPage.jsx'
import GuessDrawingPage from "./GuessDrawingPage.jsx"
import LandingPage from './LandingPage.jsx'
import LobbyPage from './LobbyPage.jsx'

function App() {
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState
  )

  store.subscribe(() => {
    saveState(store.getState());
  })

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/guess">
            <GuessDrawingPage />
          </Route>
          <Route path="/draw">
            <DrawingPage />
          </Route>
          <Route path='/lobby'>
            <LobbyPage />
          </Route>
          <Route>
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));