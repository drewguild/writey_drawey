import React from 'react';
import { connect } from 'react-redux';

import { timeExpired } from './actions'

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { time: props.time };

    this.tick = this.tick.bind(this);
  };

  componentDidUpdate() {
    if (!this.timer) {
      this.timer = setInterval(() => this.tick(), 1000);
    };

    if (this.state.time == 0) {
      clearInterval(this.timer);
      timeExpired();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState((_state, _) => ({
      time: _state.time - 1
    }))
  }

  render() {
    return (
      <h3>{this.state.time}</h3>
    )
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    timeExpired: () => dispatch(timeExpired())
  };
}

export default connect(mapDispatchToProps)(Timer);