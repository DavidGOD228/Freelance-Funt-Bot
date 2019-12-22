var https = require('https');
const utils = require('util');
var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

var app = firebase.initializeApp({***});
app.auth();

let db = firebase.firestore();

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
  getUsers: async () => {
    var data = [];
    const userData = await db.collection('UserList').get();
    userData.forEach(doc => {
      data.push(doc.data());
    });
    return data;
  },
  addUsers: async freelancehuntToken => {
    const userData = await db
      .collection('UserList')
      .add({ freelancehuntToken: freelancehuntToken });
  },
  getDBuserMessage: async apiKey => {
    var data = [];
    const userData = await db
      .collection('UserList')
      .doc(apiKey)
      .collection('Messages')
      .get();
    userData.forEach(doc => {
      data.push(doc.data());
    });
    return data;
  },
  getDBuserOffer: async apiKey => {
    var data = [];
    const userData = await db
      .collection('UserList')
      .doc(apiKey)
      .collection('Offer')
      .get();
    userData.forEach(doc => {
      data.push(doc.data());
    });
    return data;
  },
  addDBuserMessage: async (apiKey, message_, id) => {
    let userData = await db
      .collection('UserList')
      .doc(apiKey)
      .collection('Messages')
      .add({ message: message_, id: id });
    return userData;
  },
  addDBuserOffer: async (apiKey, offer_, id) => {
    let userData = await db
      .collection('UserList')
      .doc(apiKey)
      .collection('Offer')
      .add({ offer: offer_, id: id });
    return userData;
  }
};
