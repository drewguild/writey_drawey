import React from 'react';
import { connect } from 'react-redux';

class LobbyPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Game code is: {this.props.gameCode}</h2>
        <p>Share this with your friends so they can join.</p>
      </div>
    )
  }
};

const mapState = (state) => ({
  gameCode: state.game.code
})

export default connect(mapState)(LobbyPage);