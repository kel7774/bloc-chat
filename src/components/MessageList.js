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
  <section className="message-container">
    <div id="messages">
        { this.state.messages
          .filter(message => this.props.activeRoom.key === message.roomId )
          .map( (message, index) =>
            <table key={index}>
              <tr>
                <td className="message-username">{ message.username }</td>
                <td className="message-content">{ message.content }</td>
                <td className="message-sentAt">{ message.sentAt }</td>
              </tr>
            </table>
  )}
  </div>
  </section>
)
}
  }

export default MessageList;
