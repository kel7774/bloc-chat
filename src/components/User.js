import React, { Component } from 'react';
import '../styles/user.css';

class User extends Component {

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

signOut() {
  this.props.firebase.auth().signOut();
}

componentDidMount(){
  this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
  })
}

  render(){
    let guestUser = 'Guest User';
    return(
        <div id="user-sign-in">
          <h3>Login to Bloc Chat</h3>
            <div id="button-container">
              <button onClick={() => this.signIn()}>
                Login
              </button>
              <button onClick={() => this.signOut()}>
                Log Out
              </button>
            </div>
            <div id="display-user-name">
            {this.props.user ? this.props.user.displayName : guestUser }
            </div>
        </div>
    )
  }
}

export default User;
