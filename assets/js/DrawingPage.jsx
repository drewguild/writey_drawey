import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { promptReceived } from './actions';

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

  fetchNextPrompt() {

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
        <Timer time={15} />
      </div>
    )
  }
};

const mapDispatchToProps = {
  promptReceived
}

const mapState = (state) => ({
  isFirstRound: state.game.round === 1
})

export default connect(mapState, mapDispatchToProps)(DrawingPage);
