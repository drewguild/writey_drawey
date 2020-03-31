import React from "react";
import { Redirect } from "react-router-dom";

const PEN_SIZES = {
  SMALL: {radius: 5, text: "Small"},
  MEDIUM: {radius: 10, text: "Medium"},
  LARGE: {radius: 15, text: "Large"}
}

class DrawingCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawing: false,
      penColor: "#000000",
      penSize: PEN_SIZES.SMALL.radius,
      toDrawing: null //for page redirect
    };

    this.changePenColor = this.changePenColor.bind(this);
    this.changePenSize = this.changePenSize.bind(this);
    this.draw = this.draw.bind(this);
    this.submitDrawing = this.submitDrawing.bind(this);
    this.toggleDrawing = this.toggleDrawing.bind(this);
  };

  changePenColor(e) {
    this.setState({penColor: e.target.value});
  }

  changePenSize(e) {
    this.setState({penSize: e.target.value});
  }

  toggleDrawing(e) {
    this.setState((state, _) => ({
      drawing: !state.drawing
    }));
  }

  draw(click) {
    if(!this.state.drawing){
      return;
    }

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const clickX = click.clientX;
    const clickY = click.clientY;

    const rect = canvas.getBoundingClientRect();

    const strokeRadius = this.state.penSize;

    const x = clickX - rect.left - (strokeRadius / 2);
    const y = clickY - rect.top - (strokeRadius / 2);

    ctx.fillStyle = this.state.penColor;
    ctx.beginPath();
    ctx.arc(x, y, this.state.penSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  submitDrawing(e) {
    const canvas = this.refs.canvas;
    const drawingData = canvas.toDataURL();

    fetch("/api/drawings", { 
      method: 'Post', 
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({drawing_base64: drawingData})
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({toDrawing: data.drawing_id})
    });
  };  

  render() {
    if(this.state.toDrawing) {
      return <Redirect to={`/drawings/${this.state.toDrawing}`}/>
    };

    const divStyle = {
      backgroundColor: 'grey'
    };

    const canvasStyle = {
      backgroundColor: "white"
    }

    return (
      <div className="App" style={divStyle}>
        <canvas 
          ref="canvas" 
          width={400}
          height={400}
          onMouseDown={this.toggleDrawing}
          onMouseMove={this.draw}
          onMouseUp={this.toggleDrawing}
          style={canvasStyle} 
        />
        <input 
          type="color" 
          value={this.state.penColor}
          onChange={this.changePenColor}  
        />
        <select onChange={this.changePenSize}>
          <option value={PEN_SIZES.SMALL.radius}>{PEN_SIZES.SMALL.text}</option>
          <option value={PEN_SIZES.MEDIUM.radius}>{PEN_SIZES.MEDIUM.text}</option>
          <option value={PEN_SIZES.LARGE.radius}>{PEN_SIZES.LARGE.text}</option>
        </select>
        <button onClick={this.submitDrawing} />
      </div>
    );
  };
};

export default DrawingCanvas;