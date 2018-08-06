import React, { Component } from 'react';
import '../styles/messageList.css';

class MessageList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
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
      messages: this.state.messages.concat ( message ),
      newMessage: ''
    });
  });
}


render () {
  return (
    <section id="message-list">
    <h2>Messages</h2>
    <table id="message-list">
      <colgroup>
        <col id="user-name" />
        <col id="message-content" />
        <col id="message-sent-time" />
      </colgroup>
      <tbody>
        {this.state.messages.map( (message, index) =>
        <tr className="message-item" key={index}>
          <td className="message-contents">
            {message.username}
          </td>
          <td>
            {message.content}
          </td>
          <td>
            {message.sentAt}
          </td>
        </tr>
      )}
      </tbody>
    </table>
    </section>
    )
  }
}

export default MessageList;
