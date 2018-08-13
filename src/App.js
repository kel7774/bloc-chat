import React, { Component } from 'react';
import Moment from 'react-moment';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
      activeRoom: '',
      user: null
    }
  }

  makeActiveRoom = ( room ) => {
    this.setState({ activeRoom : room });
  }

  setUser = ( user ) => {
    this.setState({ user: user });
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
          <div className="main-content-container">
              <div className="user-container">
                  <User
                    firebase={firebase}
                    setUser={ (user) => this.setUser(user) }
                    user={ this.state.user }
                  />
              </div>
            <div className="message-list-container">
              <MessageList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
                user={ this.state.user }
                />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
