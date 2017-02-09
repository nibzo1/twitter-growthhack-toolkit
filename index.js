var Twit = require('twit');

var T = new Twit({
  consumer_key: "consumer_key",
  consumer_secret: "consumer_secret",
  access_token: "access_token",
  access_token_secret: "access_token_secret",
});

module.exports = T;
