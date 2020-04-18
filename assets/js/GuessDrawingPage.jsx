import React from 'react';
import { connect } from 'react-redux'

class GuessDrawingPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageBinary: null
    }
  }

  componentDidMount() {
    this.fetchDrawing();
    this.timer = setInterval(() => this.fetchDrawing(), 100)
  }

  componentDidUpdate() {
    if (this.state.imageBinary) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  fetchDrawing() {
    fetch(`/api/drawings/next?player_id=${this.props.currentPlayer}&round=${this.props.round - 1}`)
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
  currentPlayer: state.player.currentPlayer,
  round: state.game.round
})

export default connect(mapState)(GuessDrawingPage);