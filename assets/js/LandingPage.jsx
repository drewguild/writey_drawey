import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';

import { gameReceived } from './actions'
import { Redirect } from 'react-router-dom';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.newGame = this.newGame.bind(this);
    this.setPlayerName = this.setPlayerName.bind(this);
  };

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
        this.props.gameReceived(data.game_id, data.game_code)
      })
  };

  setPlayerName(e) {
    this.setState({ playerName: e.target.value })
  }

  render() {
    if (this.props.activeGame) {
      return <Redirect to='/lobby' />
    }

    return (
      <div>
        <form>
          <input placeholder="Enter game ID" />
          <button type="submit" >Join</button>
        </form>
        <input placeholder="Enter a (nick)name" onChange={this.setPlayerName} />
        <button onClick={this.newGame}>New Game</button>
      </div >
    )
  };
};

const mapState = (state) => ({
  activeGame: !!state.game.id
})

const mapDispatch = {
  gameReceived
}

export default connect(mapState, mapDispatch)(LandingPage);