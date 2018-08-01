import React, { Component } from 'react';

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
  this.setState({ newRoomName: e.target.value });
}

createRoom() {
  const newRoom = { name: this.state.newRoomName };
  this.roomsRef.push(newRoom);
}

  render() {
    return (
      <section id="chat-room-list">
      {this.state.rooms.map( (room, index) =>
        <ul className="rooms" key = {index}>
          <li className="room-index">chat room {index + 1}</li>
        </ul>
      )}
      <form id="create-room-form" onSubmit={ (e) => this.createRoom() }>
        <label for="create-room">Create Room:</label>
        <input type="text" id="new_room" onChange={ (e) => this.handleChange(e)}/>
        <input type="submit" />
      </form>
    </section>
    );
  }
}


export default RoomList;
