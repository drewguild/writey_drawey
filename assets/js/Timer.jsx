import React from 'react';

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
      clearInterval(this.timer)
      this.expire()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  expire() {
    if (this.props.onExpire) {
      this.props.onExpire();
    } else {
      console.log("Timer expired");
    };
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

export default Timer;