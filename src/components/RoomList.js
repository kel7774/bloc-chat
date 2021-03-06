import React, { Component } from 'react';
import '../styles/roomList.css';

class RoomList extends Component {
constructor(props){
  super(props);
  this.roomsRef = this.props.firebase.database().ref('rooms');
  this.state = {
    rooms: [],
    newRoomName: '',
    display: false,
  };
}

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({
      rooms: this.state.rooms.concat ( room ),
      newRoomName: '',
    });
  });
}

//forms
handleChange = e => {
  e.preventDefault();
  this.setState({ newRoomName: e.target.value });
}

createRoom = e => {
  e.preventDefault();
      if (this.state.newRoomName) {
        const newRoom = { name: this.state.newRoomName
        };
    this.roomsRef.push(newRoom);
  }
}

activeRoom = room => {
  this.props.makeActiveRoom( room );
  this.setState({ display: true });
}

deleteRoom(index){
  this.roomsRef.child(index.key).remove();
  this.setState({ rooms: this.state.rooms.filter(room => room !== index) })
}

  render() {
    return (
      <section id="chat-room-list">
      <div id="form-container">
        <form id="create-room-form" onSubmit={ this.createRoom }>
          <label for="create-room">Create Room:</label>
          <input type="text" id="new_room"
          onChange={ this.handleChange }
          value={this.state.newRoomName} />
          <input type="submit" />
        </form>
      </div>
      <ul className="rooms">
        {this.state.rooms.map( (room, index) =>
        <li className="room-index"
        key = {index}
        onClick ={ () => this.activeRoom(room) }
        >
        <button
          id="delete-button"
          onClick={ () => this.deleteRoom(room) }>
          X
        </button>
        {room.name}
        <button id="edit-button">Edit</button>
        </li>
      )}
      </ul>
    </section>
    );
  }
}


export default RoomList;
