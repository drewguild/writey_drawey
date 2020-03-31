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

import React from 'react'
import ReactDOM from 'react-dom';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import GuessDrawingPage from "./GuessDrawingPage.jsx"
import Root from './Root.jsx'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/drawings/:drawingId">
          <GuessDrawingPage />
        </Route>
        <Route path="/">
          <Root />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));