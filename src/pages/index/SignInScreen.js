// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyBa4LhzHpTWnssn2_GhOM4SBhuTkBj_5qY',
  authDomain: 'jiker-keju.firebaseapp.com',
  databaseURL: 'https://jiker-keju.firebaseio.com',
  projectId: 'jiker-keju',
  storageBucket: 'jiker-keju.appspot.com',
  messagingSenderId: '163275740455',
  appId: '1:163275740455:web:60b499e10edde65ac00502',
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/start',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};

export default class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }

    const currentUser = firebase.auth().currentUser;
    console.log('currentUser', currentUser);
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {currentUser.displayName}! You are now signed-in!</p>
        <button  onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}
