// ===============================================================================
// LOAD DATA
// Linking the routes to "data" sources that hold the array friends data
// ===============================================================================

var friends = require('../data/friends.js');

module.exports = function (app) {
  // //api path to get the friends data, responds with a json object (an array of friends). Activated on both html pages with blue API Link
  app.get('/api/friends', function (req,res) {
      console.log('app.get');
      res.json(friends);
  });

  // *** Updates an array of friends "database" array and sends back the json form of the most compatible new friend
  app.post('/api/friends', function (req, res) {
      // newFriend is the user that filled out the survey
      var newFriend = req.body;
      console.log('in app.post, newFriend param',newFriend);

      // compute best match from scores
      var bestMatch = {};
      var GreatestDifference= 40;//greatest score difference for a question is 4, therefore greatest difference is 4 times # of questions in survey
      for(var i = 0; i < newFriend.scores.length; i++) {
        if(newFriend.scores[i] == "1 (Strongly Disagree)") {
          newFriend.scores[i] = 1;
        } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
          newFriend.scores[i] = 5;
        } else {
          newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }
      }
      // compare the scores of newFriend with the scores of each friend in the database and find the friend with the smallest difference when each set of scores is compared

      var bestMatchIndex = 0;
      var bestMatchDifference = 40;

      for(var i = 0; i < friends.length; i++) {
        var totalDifference = 0;
        var comparedFriend = friends[i];
        console.log('app.post, comparedFriend',comparedFriend);


        for(var k = 0; k < comparedFriend.scores.length; k++) {
          var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
          totalDifference += differenceOneScore;
        }

        if (totalDifference < bestMatchDifference) {
          bestMatchIndex = i;
          bestMatchDifference = totalDifference;
        }
      }

      bestMatch = friends[bestMatchIndex];
      console.log('.post, bestMatch',bestMatch);

      // Put new friend from survey in "database" array
      friends.push(newFriend);
      console.log('end of .post, friends',friends);
      // return the best match friend
      res.json(bestMatch);
  });

};
