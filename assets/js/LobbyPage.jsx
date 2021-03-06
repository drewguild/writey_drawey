import React from 'react';
import { connect } from 'react-redux';

import { beginRound, fetchPlayers } from './actions'

import PlayerList from './PlayerList.jsx';
import Timer from './Timer.jsx'
import { Redirect } from 'react-router-dom';

class LobbyPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = { toNextRound: false }
  }

  componentDidMount() {
    this.props.fetchPlayers(this.props.gameId)
    this.timer = setInterval(() => this.props.fetchPlayers(this.props.gameId), 3000)
  }

  componentDidUpdate() {
    if (this.props.round) {
      this.setState({ toNextRound: true })
    }

    if (this.props.shouldBeginGame) {
      this.props.beginRound(this.props.gameId)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
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
  beginRound,
  fetchPlayers
}

export default connect(mapState, mapDispath)(LobbyPage);