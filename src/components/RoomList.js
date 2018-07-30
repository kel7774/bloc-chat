import React, { Component } from 'react';

class RoomList extends React.Component {
constructor(props){
  super(props);
  this.roomsRef = this.props.firebase.database().ref('rooms');
  this.state = {
    rooms: []
  };
}

componentDidMount(){
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat ( room ) });
  });
}

  render() {
    return (
      <section id="chat-room-list">
      {this.state.rooms.map( (room, index) =>
        <ul className="rooms" key = {index}>
          <li className="room-index">room</li>
        </ul>
      )}
    </section>
    );
  }
}


export default RoomList;
