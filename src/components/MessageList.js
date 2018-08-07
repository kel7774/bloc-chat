import React, { Component } from 'react';
import '../styles/messageList.css';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      content: '',
      username: '',
      sentAt: '',
      roomId: ''
  };
  this.messagesRef = this.props.firebase.database().ref("messages");
}

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({
      messages: this.state.messages.concat ( message )
    });
  });
}


render () {
  return (
  <section id="message-container">
  <div id="message-title">
    <h2>Messages</h2>
    <h3>{ this.props.activeRoom.name }</h3>
  </div>
    <ul>
        { this.state.messages.map( ( message, index ) => {
          if (this.props.activeRoom.roomId === message.roomId) {
            return
            <table key={index}>
              <tr>
                <td>{ message.username }</td>
                <td>{ message.content }</td>
                <td>{ message.sentAt }</td>
              </tr>
            </table>
    }}
  )}
  </ul>
  </section>
)
}
  }

export default MessageList;
