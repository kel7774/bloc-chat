import React, { Component } from 'react';
import '../styles/roomList.css';

class RoomList extends React.Component {
constructor(props){
  super(props);
  this.roomsRef = this.props.firebase.database().ref('rooms');
  this.state = {
    rooms: [],
    newRoomName: ''
  };
}

componentDidMount(){
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat ( room ) });
  });
}


//forms
handleChange(e) {
  e.preventDefault();
  if(!this.state.newRoomName) { return }
  this.setState({ newRoomName: e.target.value });
}

createRoom() {
  const newRoom = { name: this.state.newRoomName };
  this.roomsRef.push(newRoom);
}

  render() {
    return (
      <section id="chat-room-list">
      <form id="create-room-form" onSubmit={ (e) => this.createRoom() }>
        <label for="create-room">Create Room:</label>
        <input type="text" id="new_room" onChange={ (e) => this.handleChange(e)} />
        <input type="submit" />
      </form>
      <ul className="rooms">
      {this.state.rooms.map( (room, index) =>
        <li className="room-index" key = {index}>{room.name}</li>
      )}
      </ul>
    </section>
    );
  }
}


export default RoomList;
