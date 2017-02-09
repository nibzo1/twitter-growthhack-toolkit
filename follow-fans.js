var T = require('./index'),
  utils = require('./utils'),
  notifier = require('node-notifier'),
  argv = require('minimist')(process.argv.slice(2)),
  ownerScreenName = argv['userId'];
  if(ownerScreenName === "undefined") {
    console.log("usage: node follow-fans.js ownerScreenName");
  }

var favoriteStream = T.stream('user');

favoriteStream.on('favorite', function(tweet) {
  if (ownerScreenName !== tweet.source.screen_name) {
    console.log('Favorite received. Following @' + tweet.source.screen_name + ' ' + new Date());
    T.post('friendships/create', {
      screen_name: tweet.source.screen_name
    }, function(err, data, response) {
      if (err) {
        console.log(err);
      }
    });
  }
});

favoriteStream.on('follow', function(tweet) {
  if (ownerScreenName !== tweet.source.screen_name) {
    console.log('Follow received. Following @' + tweet.source.screen_name + ' ' + new Date());
    T.post('friendships/create', {
      screen_name: tweet.source.screen_name
    }, function(err, data, response) {
      if (err) {
        console.log(err);
      }
    });
  }
});

