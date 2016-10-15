//Include the path package to get the correct file path
var path = require('path');
//***********************
// Routing
//***********************
module.exports = function(app) {
// Basic route that sends the userto the landing page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/landing.html'));
});
//route to display the reservation page - res.html)
app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/res.html'));
});
// route to display the tables.html file
app.get('/tables', function (req, res) {
    res.sendFile(path.join(__dirname, '/../public/tables.html'));
});
// If no matching route is found default to home
app.use(function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/landing.html'));
});
};
