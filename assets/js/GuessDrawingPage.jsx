import React from 'react';

class GuessDrawingPage extends React.Component {
  constructor(props) {
    super(props)

    // TODO: two issues: 1) janky line, 2) should this component know the expected url structure?
    this.state = {
      drawingId: window.location.pathname.split("/").reverse()[0],
      imageBinary: null
    }

    fetch(`/api/drawings/${this.state.drawingId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ imageBinary: data.image_binary })
      })
  }

  render() {
    return (
      <div>
        <h2>What do you see?</h2>
        <img src={this.state.imageBinary} />
      </div>
    )
  }
}

export default GuessDrawingPage;