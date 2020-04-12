import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';

import { currentPlayerSet, gameReceived } from './actions'
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

    fetch(`/api/games/${this.state.gameCode}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_name: this.state.playerName
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.props.currentPlayerSet(data.players[0])
        this.props.gameReceived(data.game_id, data.game_code)
      })
  }

  newGame() {
    if (!this.state.playerName) {
      return
    }

    fetch("/api/games", {
      method: 'Post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initial_player_name: this.state.playerName
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.currentPlayerSet(data.players[0])
        this.props.gameReceived(data.game_id, data.game_code)
      })
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
  currentPlayerSet,
  gameReceived
}

export default connect(mapState, mapDispatch)(LandingPage);