import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
