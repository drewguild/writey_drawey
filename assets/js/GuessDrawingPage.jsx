import React from 'react';
import { connect } from 'react-redux'

class GuessDrawingPage extends React.Component {
  constructor(props) {
    super(props)

    fetch(`/api/drawings/next?player_id=${this.props.currentPlayer}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ imageBinary: data.image_binary })
      })
  }

  render() {
    return (
      <div>
        <h2>What do you see?</h2>
        <img src={this.state.imageBinary} />
        <input type='text' />
      </div>
    )
  }
}

const mapState = (state) => ({
  currentPlayer: state.player.currentPlayer
})

export default connect(mapState)(GuessDrawingPage);