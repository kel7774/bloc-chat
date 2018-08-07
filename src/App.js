import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import './App.css';

var config = {
  apiKey: "AIzaSyC41jLBWvV198BzEg-899msO2CBrBTni4M",
  authDomain: "bloc-chat-73bd3.firebaseapp.com",
  databaseURL: "https://bloc-chat-73bd3.firebaseio.com",
  projectId: "bloc-chat-73bd3",
  storageBucket: "bloc-chat-73bd3.appspot.com",
  messagingSenderId: "979377106377"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: ''
    }
  }

  makeActiveRoom = (room) => {
    this.setState({ activeRoom : room });
  }


  render() {
    return (
      <div className="App">
        <div className="room-list-container">
          <RoomList
          firebase={firebase}
          makeActiveRoom={this.makeActiveRoom}
          activeRoom={this.state.activeRoom}
          />
          </div>
        <div className="message-list-container">
          <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          />
        </div>
      </div>
    );
  }
}

export default App;
