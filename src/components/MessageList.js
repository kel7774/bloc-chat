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
  </div>
    <div id="message-content">
        { this.state.messages
          .filter(roomId => roomId !== this.state.messages.roomID )
          .map( (message, index) =>
            <table key={index}>
              <tr>
                <td>{ message.username }</td>
                <td>{ message.content }</td>
                <td>{ message.sentAt }</td>
              </tr>
            </table>
  )}
  </div>
  </section>
)
}
  }

export default MessageList;
