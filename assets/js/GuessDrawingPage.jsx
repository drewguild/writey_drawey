import React from 'react';
import { connect } from 'react-redux'

import Timer from './Timer.jsx'
import { Redirect } from 'react-router-dom';
import { roundChanged } from './actions'

class GuessDrawingPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageBinary: null
    }

    this.setGuess = this.setGuess.bind(this)
  }

  // TODO: this duplicates logic from LobbyPage
  advanceRound() {
    fetch(`/api/games/${this.props.gameId}/rounds?current_round=${this.props.round}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.props.roundChanged(data.ordinality)
      })
  }

  componentDidMount() {
    this.fetchDrawing();
    this.timer = setInterval(() => this.fetchDrawing(), 100)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.round && prevProps.round != this.props.round) {
      this.setState({ toNextRound: true })
    }

    if (this.state.imageBinary) {
      clearInterval(this.timer)
      this.timer = null
    }

    if (this.shouldSubmit()) {
      this.submitGuess()
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

  setGuess(e) {
    this.setState({ guess: e.target.value })
  }

  shouldSubmit() {
    return (this.props.shouldSubmit && !this.state.hasSubmitted);
  }

  submitGuess() {
    fetch("/api/prompts", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.guess,
        game_id: this.props.gameId,
        player_id: this.props.currentPlayer,
        round: this.props.round
      })
    })
      .then((response) => {
        return response.json()
      })
      .then((_) => {
        this.setState({ hasSubmitted: true })
        this.advanceRound()
      })
  }

  render() {
    if (this.state.toNextRound) {
      return <Redirect to="/draw" />
    }

    return (
      <div>
        <h2>What do you see?</h2>
        <img src={this.state.imageBinary} />
        <input type='text' placeholder="Make a guess" onChange={this.setGuess} />
        <Timer time={10} />
      </div>
    )
  }
}

const mapDispatch = {
  roundChanged
}

const mapState = (state) => ({
  currentPlayer: state.player.currentPlayer,
  gameId: state.game.id,
  round: state.game.round,
  shouldSubmit: state.timer.expired
})

export default connect(mapState, mapDispatch)(GuessDrawingPage);