import { Axios } from 'axios';
import React, { useState, useEffect, Component } from "react";
import song from "../varsham.mp3";
import { FaCirclePlay } from "react-icons/fa6";
class Postcard extends Component {
  state = {      
    audio: new Audio(song),
    isPlaying: false,
};
  
playPause = () => {

  let isPlaying = this.state.isPlaying;

  if (isPlaying) {
    
      this.state.audio.pause();
  } else {

     
      this.state.audio.play();
  }


  this.setState({ isPlaying: !isPlaying });
};
render() {
      return (
          <div>
              <h1>SOngs BGMS</h1>
              <p>
                  {this.state.isPlaying ?
                      "Song is Playing" :
                      "Song is Paused"}
              </p>

              {/* Button to call our main function */}
              <button onClick={this.playPause}>
              <FaCirclePlay />  Play | Pause
              </button>
          </div>
      );
  }
}


export default Postcard;