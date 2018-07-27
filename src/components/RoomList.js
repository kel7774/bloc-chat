import React, { Component } from 'react';

class RoomList extends React.Component {
constructor(props){
  super(props);

  this.roomsRef = this.props.firebase.database().ref('rooms');

  this.state = {
    rooms: []
  };

  componentDidMount(){
    const room = snapshot.val();
    room.key = snapshot.key;
    this.roomsRef.on('child_added', snapshot => {
      this.setState({ rooms: this.state.rooms.concat ( room ) });
    });
  }
}

  render() {
    return (

    );
  }
}


export default RoomList;
