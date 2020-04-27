import React from 'react';
import { connect } from 'react-redux';

import { playerReceived, roundChanged } from './actions'
import { Players } from './api'

import PlayerList from './PlayerList.jsx';
import Timer from './Timer.jsx'
import { Redirect } from 'react-router-dom';

class LobbyPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { toNextRound: false }

    this.createRound = this.createRound.bind(this)
    this.fetchPlayers = this.fetchPlayers.bind(this)
  }

  componentDidMount() {
    this.fetchPlayers()
    this.timer = setInterval(() => this.fetchPlayers(), 3000)
  }

  componentDidUpdate() {
    if (this.props.round) {
      this.setState({ toNextRound: true })
    }

    if (this.props.shouldBeginGame) {
      this.createRound()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  createRound() {
    fetch(`/api/games/${this.props.gameId}/rounds`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.props.roundChanged(data.ordinality)
      })
  }

  fetchPlayers() {
    // TODO: handling the promise here feels weird
    const p = Players.forGame(this.props.gameId)

    p.then((response) => {
      _.map(response.data, (player) => {
        this.props.playerReceived(player)
      })
    })
  }

  render() {
    const timer = this.props.allPlayersReady ? <Timer time={5} /> : null

    if (this.state.toNextRound) {
      return <Redirect to={"/draw"} />
    }

    return (
      <div>
        <h2>Game code is: {this.props.gameCode}</h2>
        <p>Share this with your friends so they can join.</p>
        <PlayerList />
        {timer}
      </div>
    )
  }
};

const mapState = (state) => ({
  allPlayersReady: _.every(state.player.players, (player) => { return player.status == 'READY' }),
  shouldBeginGame: state.timer.expired,
  gameId: state.game.id,
  gameCode: state.game.code,
  round: state.game.round
})

const mapDispath = {
  playerReceived,
  roundChanged
}

export default connect(mapState, mapDispath)(LobbyPage);