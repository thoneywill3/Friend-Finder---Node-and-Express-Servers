// ===============================================================================
// LOAD DATA
// Linking the routes to "data" sources that hold the array friends data
// ===============================================================================

var friends = require('../data/friends.js');

module.exports = function (app) {
// //api path to get the friends data, responds with a json object (an array of friends)
app.get('/api/friends', function (req,res) {
    res.json(friends);
});

// *** Updates an array of friends "database" array and sends back the json form of the most compatible new friend
app.post('/api/friends', function (req, res) {
    // newFriend is the user that filled out the survey
    var newFriend = req.body;
    console.log('in app.post',newFriend);


    // compute best match from scores
    var bestMatch = {};

    for(var i = 0; i < newFriend.scores.length; i++) {
      if(newFriend.scores[i] == "1 (Strongly Disagree)") {
        newFriend.scores[i] = 1;
      } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
        newFriend.scores[i] = 5;
      } else {
        newFriend.scores[i] = parseInt(newFriend.scores[i]);
      }
    }
    // Put new friend from survey in "database" array
    friends.push(newFriend);
    // return the best match friend
    res.json(bestMatch);
});

};
