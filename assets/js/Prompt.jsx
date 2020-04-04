import React from 'react'
import { connect } from 'react-redux'

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

const mapState = (state) => ({
  word: state.prompt.text
});

export default connect(mapState)(Prompt);