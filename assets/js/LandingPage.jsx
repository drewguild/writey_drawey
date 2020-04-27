import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';

import { addPlayer, createGame } from './actions'
import { Redirect } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.joinGame = this.joinGame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.setGameCode = this.setGameCode.bind(this);
    this.setPlayerName = this.setPlayerName.bind(this);
  };

  joinGame() {
    if (!this.state.gameCode || !this.state.playerName) {
      return
    }

    this.props.addPlayer(this.state.gameCode, this.state.playerName)
  }

  newGame() {
    if (!this.state.playerName) {
      return
    }

    this.props.createGame(this.state.playerName)
  };

  setGameCode(e) {
    this.setState({ gameCode: e.target.value })
  }

  setPlayerName(e) {
    this.setState({ playerName: e.target.value })
  }

  render() {
    if (this.props.activeGame) {
      return <Redirect to='/lobby' />
    }

    return (
      <div>
        <div>
          <input placeholder="Enter game ID" onChange={this.setGameCode} />
          <button onClick={this.joinGame}>Join</button>
        </div>
        <div>
          <input placeholder="Enter a (nick)name" onChange={this.setPlayerName} />
          <button onClick={this.newGame}>New Game</button>
        </div>
      </div >
    )
  };
};

const mapState = (state) => ({
  activeGame: !!state.game.id
})

const mapDispatch = {
  addPlayer,
  createGame
}

export default connect(mapState, mapDispatch)(LandingPage);