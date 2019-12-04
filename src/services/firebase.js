import firebase from 'firebase'

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

const database = firebase.database();

export function writeUserData(userId, accessToken) {
  database.ref('users/' + userId).set({
    accessToken,
  });
}

export default database
