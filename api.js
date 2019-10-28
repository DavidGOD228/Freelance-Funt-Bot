var https = require("https");
const axios = require("axios");

const freelancehuntToken = "7b9052f154825826c64733576e63b18746764e38";
// Authorization: `Bearer ${freelancehuntToken}`

var options = {
  method: "GET",
  hostname: "https://api.freelancehunt.com",
  path: "/v2/my/feed",
  headers: {
    Authorization: "Bearer " + freelancehuntToken
  }
};

var req = https.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  });

  res.on("end", function(chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function(error) {
    console.error(error);
  });
});

req.end();
