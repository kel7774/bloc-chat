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
    return(
        <div id="user-sign-in">
          <h3>Login to Bloc Chat</h3>
          <form id="sign-in">
            <label for="username">Username:</label>
            <input type="text" placeholder="Username" name="username" id="username"/>
            <label for="password">Password:</label>
            <input type="password" placeholder="Password" name="password" id="password"/>
            <div id="button-container">
              <button onClick={() => this.signIn()}>
                Login
              </button>
              <button onClick={() => this.signOut()}>
                Log Out
              </button>
            </div>
            <div id="display-user-name">
            {this.props.user ? this.props.user.displayName : <p>Guest</p>}
            </div>
          </form>
        </div>
    )
  }
}

export default User;
