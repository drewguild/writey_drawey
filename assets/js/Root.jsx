import React from 'react';
import _ from 'lodash'

import DrawingCanvas from './DrawingCanvas.jsx'
import Prompt from './Prompt.jsx'


class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {prompt: null};

    fetch('/api/prompts/random')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({prompt: data.prompt})
      });
  };

  randomWord() {
    return _.sample(["Not yet"]);
  }

  render() {
    return (
      <div>
        <Prompt word={this.state.prompt}/>
        <DrawingCanvas />
      </div>
    )
  }
};

export default Root;
