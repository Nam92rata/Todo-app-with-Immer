import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import './App.css';
import ToDoList from './Components/todo';
// import addTodo from './Actions/index';
import { addTodo, setFilter, toggleTodo } from './Actions/index';
var SpeechRecognition;
SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
const speaker = new SpeechSynthesisUtterance();
recognition.continous = true;
recognition.interimResults = true
recognition.lang = 'en-US'

speaker.lang = 'en-US';
speaker.text = 'Your task was added';
class App extends Component {
  constructor() {
    super()
    this.state = {
      listening: false,
      val: '',
      inputThing: ""
    }
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
  }
  toggleListen() {
    console.log("Toggle listen")
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

  handleListen() {
    console.log("Handle listen")
    if (this.state.listening) {
      recognition.start()
      console.log("start");
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      // document.getElementById('interim').innerHTML = interimTranscript
      // document.getElementById('final').innerHTML = finalTranscript
      // console.log("YEs",finalTranscript); 
      this.setState({ val: finalTranscript });
      this.handleClick();
      // console.log(speaker.text) ;

      // speechSynthesis.speak(speaker);

    }



  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({ val: e.target.value })
  }
  handleClick = () => {
    console.log("Fired")
    if (this.state.val !== "") {
      this.props.addTodo(this.name.value);
      speechSynthesis.speak(speaker);
      console.log(this.name.value);
      this.setState({ val: '' })
      this.name.value = '';
    }

  }
  onClick = (e) => {
    this.props.setFilter(e.target.value);

  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <br></br>
          <br></br>
          <h1>Day Planner</h1>
          <br></br>
          <div className="row form-group">
            < div className="col-md-3">
            </div>
            <div className="col-md-6">
              <input type="text" ref={input => this.name = input} value={this.state.val} onChange={e => { this.onChangeHandler(e) }} />
              <button className="btn btn-primary ml-3" onClick={this.handleClick.bind(this)}>Add task</button>
              <button style={button} onClick={this.toggleListen} >Tap to speak</button>
              {/* <div id='final' style={final}></div> */}
            </div>
          </div>

          <div className="row form-group">
            < div className="col-md-3">
            </div>
            <div className="col-md-6 ">
              Show: <button className="btn btn-primary btn-space mr-3" value="All" onClick={e => this.onClick(e)}>All</button>
              <button className="btn btn-primary btn-space mr-3" value="Active" onClick={e => this.onClick(e)}>Active</button>
              <button className="btn btn-primary btn-space mr-3" value="Completed" onClick={e => this.onClick(e)}>Completed</button>
            </div>
          </div>

          <div className="row form-group">
            < div className="col-md-3">
            </div>
            <div className="col-md-6">
              <ToDoList item={this.props.user} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.todoReducer

  }

}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addTodo, setFilter, toggleTodo }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',

  },
  button: {
    // width: '40px',
    height: '40px',
    background: 'lightblue',
    borderRadius: '20px',
    margin: '1em 1em 1em 1em'
  },
  interim: {
    color: 'gray',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  },
  final: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px'
  }
}

const { container, button, interim, final } = styles