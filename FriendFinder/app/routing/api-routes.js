// ===============================================================================
// LOAD DATA
// Linking the routes to "data" sources that hold the array friends data
// ===============================================================================

var friends = require('../data/friend.js');

module.exports = function (app) {
// //api path to get the friends data, responds with a json object (an array of friends)
app.get('/api/friends', function (req,res) {
    res.json(reservations);
});

// *** Just updates an array of friends data and sends back the json form of the new friend
app.post('/api/friends', function (req, res) {
    var newFriend = req.body;
    newFriend.routeName = newFriend.friendName.replace(/\s+/g, '').toLowerCase();
    friends.push(newFriend);
    res.json(newFriend);
});

};
