import firebase from 'firebase';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { writeUserData } from '../../services/firebase';
import { listPrivateRepos } from '../../services/github';

export default class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
    user: {
      repos: [],
    },
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // signInSuccessUrl: '/start',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      { provider: firebase.auth.GithubAuthProvider.PROVIDER_ID, scopes: ['repo'] },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        const accessToken = authResult.credential.accessToken;
        writeUserData(authResult.user.uid, accessToken);

        console.log('authResult accessToken', accessToken);
        const repos = await listPrivateRepos(accessToken);
        this.setState({
          user: { repos },
        });

        return false;
      },
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      console.log('user', user);

      this.setState({ isSignedIn: !!user });
      user &&
        user.getIdToken().then(async accessToken => {
          console.log('user.getIdToken() accessToken', accessToken);
          writeUserData(user.uid, accessToken);
          // const client = createGitHubClient(accessToken);
          // await listRepos(client);
          // await listPrivateRepos(accessToken);
        });
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { isSignedIn, user } = this.state;
    if (!isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }

    const currentUser = firebase.auth().currentUser;
    console.log('currentUser', currentUser);
    console.log('firebase.auth()', firebase.auth());
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {currentUser.displayName}! You are now signed-in!</p>
        {user.repos && (
          <ul>
            {user.repos.map(repo => (
              <li>
                <a href={repo.html_url}>{`${repo.full_name} | ${repo.description}`}</a>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}
