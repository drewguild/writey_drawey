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

    this.fetchRandomPrompt = this.fetchRandomPrompt.bind(this)
  };

  componentDidMount() {
    if (this.props.isFirstRound) {
      this.fetchRandomPrompt()
    } else {
      this.fetchNextPrompt()
    }
  }

  componentWillUnmount() {
    this.props.promptExpired()
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
  isFirstRound: state.game.round == 1,
  round: state.game.round
})

export default connect(mapState, mapDispatchToProps)(DrawingPage);
