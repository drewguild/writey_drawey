import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { promptExpired, promptReceived } from './actions';

import DrawingCanvas from './DrawingCanvas.jsx';
import Prompt from './Prompt.jsx';
import Timer from './Timer.jsx'


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

    fetch(`api/games/${this.props.gameId}/rounds/complete?round=${this.props.round - 1}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({ waiting: !data.complete })
      })
  }

  fetchPrompt() {
    if (this.props.isFirstRound) {
      this.fetchRandomPrompt()
    } else {
      this.fetchNextPrompt()
    }
  }

  fetchNextPrompt() {
    fetch(`/api/prompts/next?player_id=${this.props.currentPlayer}&round=${this.props.round - 1}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.props.promptReceived(data.id, data.prompt)
      })
  }

  fetchRandomPrompt() {
    fetch('/api/prompts/random')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.promptReceived(data.id, data.prompt);
      });
  }

  render() {
    if (this.state.waiting) {
      return <h2>One moment...</h2>
    }

    return (
      <div>
        <Prompt />
        <DrawingCanvas />
        <Timer time={60} />
      </div>
    )
  }
};

const mapDispatchToProps = {
  promptExpired,
  promptReceived
}

const mapState = (state) => ({
  currentPlayer: state.player.currentPlayer,
  gameId: state.game.id,
  isFirstRound: state.game.round == 1,
  hasPrompt: state.prompt.id,
  round: state.game.round
})

export default connect(mapState, mapDispatchToProps)(DrawingPage);
