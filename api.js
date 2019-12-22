var https = require('https');
const utils = require('util');
var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var app = firebase.initializeApp({
  apiKey: "AIzaSyCy0s47WkBnaqXw-DjJsXF9Hne2AvLDsQY",
  authDomain: "freelancehunt-bot-d1d8e.firebaseapp.com",
  databaseURL: "https://freelancehunt-bot-d1d8e.firebaseio.com",
  projectId: "freelancehunt-bot-d1d8e",
  storageBucket: "freelancehunt-bot-d1d8e.appspot.com",
  messagingSenderId: "326194914754",
  appId: "1:326194914754:web:ad4f73c2ea7d5db900a25b",
});

let db = firebase.firestore();

// (async () => {
//   let userData = await db
//     .collection("users")
//     .doc("820f011bb5c40e0ac23b113c82e3ee30e375e887")
//     .get()
//     .then(el => el.data());
//   console.log(userData);
// })();

module.exports = {
  request: function request(options) {
    return new Promise(function(resolve, reject) {
      https
        .request(options, function(res) {
          var chunks = [];

          res.on('data', function(chunk) {
            chunks.push(chunk);
          });

          res.on('end', function(chunk) {
            let body = Buffer.concat(chunks);
            let jsonB = JSON.parse(body.toString());
            let data = jsonB.data;

            resolve(jsonB.data);
          });

          res.on('error', function(error) {
            console.error('Error: ', error);
          });
        })
        .end();
    });
  },
  db: db,
  getDBuserData: async apiKey => {
    let userData = await db
      .collection('UserList')
      .doc(apiKey)
      .get()
      .then(el => el.data());
    return userData;

  },
    addDBuserData: async (apiKey, message) => {
let userData = await db.collection('UserList').doc(apiKey).set({
    subect: message
  });
  return userData;
  }
};
