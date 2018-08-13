import React, { Component } from 'react';
import Moment from 'react-moment';
import '../styles/messageList.css';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessageContent: ''
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

handleChange = (e) => {
  e.preventDefault();
  this.setState({ newMessageContent: e.target.value });
}

createMessage = (e) => {
  e.preventDefault();
  // let timeStamp = this.props.firebase.database.ServerValue.TIMESTAMP;
  if(this.state.newMessageContent) {
    const newMessage = {
      content: this.state.newMessageContent,
      username: this.props.user.displayName || 'guest',
      roomId: this.props.activeRoom.key,
     };
    this.messagesRef.push(newMessage);
  }
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
      <div id="send-messages">
        <form onSubmit = { this.createMessage }>
          <input type="text"
                placeholder="Write your message here..."
                onChange={ this.handleChange }
                value={ this.state.newMessageContent }/>
          <button>Enter</button>
        </form>
      </div>
    </section>
)
}
  }

export default MessageList;
