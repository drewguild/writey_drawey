import React from 'react';
import { connect } from 'react-redux';

import { playerReceived } from './actions'
import PlayerList from './PlayerList.jsx';

class LobbyPage extends React.Component {
  componentDidMount() {

    // TODO: this will need to do polling/sockets
    // AND will need to clear players who have dropped (less urgent)
    fetch(`/api/games/${this.props.gameId}/players`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        _.map(data, (player) => {
          this.props.playerReceived(player.id, player.name)
        });
      })
  }

  render() {
    return (
      <div>
        <h2>Game code is: {this.props.gameCode}</h2>
        <p>Share this with your friends so they can join.</p>
        <PlayerList />
      </div>
    )
  }
};

const mapState = (state) => ({
  gameId: state.game.id,
  gameCode: state.game.code
})

const mapDispath = {
  playerReceived
}

export default connect(mapState, mapDispath)(LobbyPage);