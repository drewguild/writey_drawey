import React from 'react';
import _ from 'lodash';

import DrawingCanvas from './DrawingCanvas.jsx';
import Prompt from './Prompt.jsx';
import Timer from './Timer.jsx'


class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = { prompt: null };

    this.setSubmitAndRedirect = this.setSubmitAndRedirect.bind(this);

    fetch('/api/prompts/random')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ prompt: data.prompt })
      });
  };

  setSubmitAndRedirect() {
    this.setState({ submitAndRedirect: true });
  };

  render() {
    return (
      <div>
        <Prompt word={this.state.prompt} />
        <DrawingCanvas />
        <Timer
          time={8}
          onExpire={() => { this.setSubmitAndRedirect }}
        />
      </div>
    )
  }
};

export default Root;
