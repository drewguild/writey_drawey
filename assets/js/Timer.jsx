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
      this.props.timeExpired();
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

const mapStateToProps = (state) => {
  return { expired: state.timer.expired }
};

const mapDispatchToProps = {
  timeExpired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Timer);