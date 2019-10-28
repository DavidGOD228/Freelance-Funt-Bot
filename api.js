var https = require("https");
const utils = require("util");

module.exports = {
  request: function request(options) {
    return new Promise(function(resolve, reject) {
      https
        .request(options, function(res) {
          var chunks = [];

          res.on("data", function(chunk) {
            chunks.push(chunk);
          });

          res.on("end", function(chunk) {
            let body = Buffer.concat(chunks);
            let jsonB = JSON.parse(body.toString());
            let data = jsonB.data;

            resolve(jsonB.data);
          });

          res.on("error", function(error) {
            console.error("Error: ", error);
          });
        })
        .end();
    });
  }
};

// (async () => {
//   console.log(await request(options));
// })();
