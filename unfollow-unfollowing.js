var T = require('./index.js'),
  utils = require('./utils'),
  argv = require('minimist')(process.argv.slice(2)),
  stopId = argv['stopId'] || -1; // defines people not to unfollow

function randIndex (arr) {
  var index = Math.floor(arr.length*Math.random());
  return arr[index];
};
var unfollowing = function(){
  T.get('followers/ids', function(err, reply) {
    if(err) return console.log(err);
    var followers = reply.ids;

    T.get('friends/ids', function(err, reply) {
              if(err) return console.log(err);
              var friends = reply.ids
                , pruned = false;
              
              while(!pruned) {
                var target = randIndex(friends);
                
                if(!~followers.indexOf(target) && target != stopId) {
                  pruned = true;
                  console.log("unfollowing" + target); 
                  utils.doUnFollow(target);
                  unfollowing(); // loop back
                }
              }
          });
  });
}
unfollowing();