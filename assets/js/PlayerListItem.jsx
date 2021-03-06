import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { changePlayerStatus } from './actions'

class PlayerListItem extends React.Component {
  constructor(props) {
    super(props)

    this.readyPlayer = this.readyPlayer.bind(this)
  }

  readyPlayer() {
    this.props.changePlayerStatus(this.props.id, 'READY')
  }

  render() {
    let button;
    if (this.props.enoughPlayers) {
      if (this.props.isPlayerReady) {
        button = <button disabled={true}>Good to go!</button>
      } else if (this.props.isCurrentPlayer) {
        button = <button onClick={this.readyPlayer}>Ready?</button>
      } else {
        button = <button disabled={true}>Ready?</button>
      }
    } else {
      button = <button disabled={true}>Waiting for players</button>
    }

    return (
      <li>
        <span>{this.props.name}</span>
        <span>{button}</span>
      </li>
    )
  }
};

const mapState = (state, ownProps) => {
  const player = _.find(state.player.players, (player) => { return player.name == ownProps.name })

  return {
    enoughPlayers: state.player.players.length > 3,
    isCurrentPlayer: state.player.currentPlayer == ownProps.id,
    isPlayerReady: player.status == 'READY'
  }
};

const mapDispatch = {
  changePlayerStatus,
}

export default connect(mapState, mapDispatch)(PlayerListItem)