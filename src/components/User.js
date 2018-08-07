import React, { Component } from 'react';

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
            <label for="username">Enter Username</label>
            <input type="text" placeholder="Username" name="username" id="username"/>
            <label for="password">Enter Password</label>
            <input type="password" placholder="Password" name="password" id="password"/>

            <button type="submit">
            Login
            </button>

            <button>
            Log Out
            </button>
          </form>
        </div>
    )
  }
}

export default User;
