import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import PlayerListItem from './PlayerListItem.jsx'

class PlayerList extends React.Component {
  render() {
    const listStyle = {
      listStyleType: "none"
    }

    return (
      <div>
        <p>Players:</p>
        <ul style={listStyle}>
          {this.props.players.map(player =>
            <PlayerListItem key={player.id} {...player} />
          )}
        </ul>
      </div>
    )
  }
}

const mapState = (state) => ({
  players: state.player.players
})

export default connect(mapState)(PlayerList);