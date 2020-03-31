import React from 'react'

class Prompt extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <h2>You are drawing: {this.props.word}</h2>
    )
  };
};

export default Prompt