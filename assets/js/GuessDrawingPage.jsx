import React from 'react';
import { connect } from 'react-redux'

import Timer from './Timer.jsx'
import { Redirect } from 'react-router-dom';
import { advanceToNextRound } from './actions'
import { Games, Drawings, Prompts } from './api'

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

  checkRound() {
    Games.roundStatus(this.props.gameId, this.props.round - 1)
      .then((response) => {
        this.setState({ waiting: !response.data.complete })
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
    Drawings.get(this.props.currentPlayer, this.props.round - 1)
      .then((response) => {
        this.setState({ imageBinary: response.data.image_binary })
      })
  }

  setGuess(e) {
    this.setState({ guess: e.target.value })
  }

  shouldSubmit() {
    return (this.props.shouldSubmit && !this.state.hasSubmitted);
  }

  submitGuess() {
    Prompts.create(
      this.state.guess,
      this.props.gameId,
      this.props.currentPlayer,
      this.props.round
    )
      .then((_) => {
        this.setState({ hasSubmitted: true })
        this.props.advanceToNextRound(this.props.gameId, this.props.round)
      })
  }

  render() {
    if (this.state.toNextRound) {
      if (this.props.isLastRound) {
        return <Redirect to="/end" />
      } else {
        return <Redirect to="/draw" />
      }
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
  advanceToNextRound,
}

const mapState = (state) => ({
  currentPlayer: state.player.currentPlayer,
  gameId: state.game.id,
  isLastRound: state.game.round >= (state.player.players.length - state.player.players.length % 2),
  round: state.game.round,
  shouldSubmit: state.timer.expired
})

export default connect(mapState, mapDispatch)(GuessDrawingPage);