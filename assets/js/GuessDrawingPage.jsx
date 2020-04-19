import React from 'react';
import { connect } from 'react-redux'

import Timer from './Timer.jsx'
import { Redirect } from 'react-router-dom';
import { roundChanged } from './actions'

class GuessDrawingPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageBinary: null,
      waiting: true,
      guess: ""
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

  checkRound() {
    fetch(`api/games/${this.props.gameId}/rounds/complete?round=${this.props.round - 1}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({ waiting: !data.complete })
      })
  }

  componentDidMount() {
    this.checkRound()
    this.checkRoundTimer = setInterval(() => this.checkRound(), 200)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.round && prevProps.round != this.props.round) {
      this.setState({ toNextRound: true })
    }

    if (!this.state.waiting) {
      clearInterval(this.checkRoundTimer)
      this.checkRoundTimer = null

      if (!this.state.imageBinary) {
        this.fetchDrawing();
      }
    }

    if (this.shouldSubmit()) {
      this.submitGuess()
    }
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

    if (this.state.waiting) {
      return <h2>One moment...</h2>
    }

    return (
      <div>
        <h2>What do you see?</h2>
        <img src={this.state.imageBinary} />
        <input type='text' placeholder="Make a guess" onChange={this.setGuess} />
        <Timer time={30} />
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