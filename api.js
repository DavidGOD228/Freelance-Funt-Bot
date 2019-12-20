var https = require('https');
const utils = require('util');
var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

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
  getDBuserData: async apiKey => {
    let userData = await db
      .collection('users')
      .doc('820f011bb5c40e0ac23b113c82e3ee30e375e887')
      .get()
      .then(el => el.data());
    return userData;
  }
};
