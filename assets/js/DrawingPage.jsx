import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchNextPrompt, fetchRandomPrompt, promptExpired } from './actions';

import DrawingCanvas from './DrawingCanvas.jsx';
import Prompt from './Prompt.jsx';
import Timer from './Timer.jsx'
import { Games } from './api';


class DrawingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: true
    }
  };

  componentDidMount() {
    this.checkRound()
    this.checkRoundTimer = setInterval(() => this.checkRound(), 1000)
  }

  componentDidUpdate() {
    if (!this.state.waiting) {
      clearInterval(this.checkRoundTimer)
      this.checkRoundTimer = null

      if (!this.props.hasPrompt) {
        this.fetchPrompt()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.checkRoundTimer)
    this.checkRoundTimer = null
    this.props.promptExpired()
  }

  checkRound() {
    if (this.props.isFirstRound) {
      this.setState({ waiting: false })
      return
    }

    Games.roundStatus(this.props.gameId, this.props.round - 1)
      .then((response) => {
        this.setState({ waiting: !response.data.complete })
      })
  }

  fetchPrompt() {
    if (this.props.isFirstRound) {
      this.props.fetchRandomPrompt()
    } else {
      this.props.fetchNextPrompt(this.props.currentPlayer, this.props.round - 1)
    }
  }

  render() {
    if (this.state.waiting) {
      return <h2>One moment...</h2>
    }

    return (
      <div>
        <Prompt />
        <DrawingCanvas />
        <Timer time={20} />
      </div>
    )
  }
};

const mapDispatchToProps = {
  fetchNextPrompt,
  fetchRandomPrompt,
  promptExpired
}

const mapState = (state) => ({
  currentPlayer: state.player.currentPlayer,
  gameId: state.game.id,
  isFirstRound: state.game.round == 1,
  hasPrompt: state.prompt.id,
  round: state.game.round
})

export default connect(mapState, mapDispatchToProps)(DrawingPage);
