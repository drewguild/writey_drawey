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
    this.fetchRandomPrompt()
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
        <Timer time={30} />
      </div>
    )
  }
};

const mapDispatchToProps = {
  promptReceived
}

export default connect(null, mapDispatchToProps)(DrawingPage);
