import React, { Component } from 'react';
import './App.scss';

const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];
class DrumPad extends Component{
  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.playSound = this.playSound.bind(this)
  }
  componentDidMount(){
    document.addEventListener('keydown',this.handleKeyPress)
  }
  componentWillUnmount(){
    document.removeEventListener('keydown',this.handleKeyPress)
  }
  handleKeyPress(e){
    if(e.keyCode === this.props.keyCode){
      console.log(e.keyCode)
      this.playSound();
    }
  }
  playSound(){
    const sound = document.getElementById(this.props.keyTrigger);
    sound.play();
    this.props.updateDisplay(this.props.name);
  }
  render(){ 
    return (
      <div className = "drum-pad" onClick = {this.playSound} id = {this.props.id}>
        {this.props.keyTrigger}
        <audio className="clip" id = {this.props.keyTrigger} src = {this.props.url}></audio>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: '',
    }
    this.updateDisplay = this.updateDisplay.bind(this);
  }
  updateDisplay(name){
    this.setState({
      display: name
    })
  }
  render(){
    const padBank = bankOne.map(
      (pad)=>{
        return(
          <DrumPad
            keyCode = {pad.keyCode}
            keyTrigger = {pad.keyTrigger}
            url = {pad.url}
            name = {pad.id}
            id = {pad.id}
            updateDisplay = {this.updateDisplay}/>
        )
      }
    )
    return(
      <div>
        <div id = "drum-machine" >
          <div className = "padContainer">
            {padBank}
          </div>
          <div id = "display">
            {this.state.display}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
