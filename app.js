//var connect = require('connect');
//var Twitter = require('twitter');
//var serveStatic = require('serve-static');
var Twitter = require('twitter-node-client').Twitter;
//var http = require('http');

var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var serveIndex = require('serve-index');
var path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use("/", serveIndex("public"));


app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
/*
connect().use(serveStatic('./public')).listen(8080, function() {
    console.log('Server running on 8080...');
});

*/

var config = {
    "consumerKey": "uwAcM2cGOqcuslNIFHgYoyJRL",
    "consumerSecret": "aV03HYizmS1vmMJ5dZROeVVcXQWGMiq48CsTgFGCZK1xiahRBx",
    "accessToken": "1486245986-nwqzW414I9CvVyHfpAksoZW1gz95tAnv3zoCJNP",
    "accessTokenSecret": "JlBa1Fewyhk6S4sLw9I4D5GEOTI849gL8TShPQVeUlV5l",
    //"callBackUrl": "XXX"
}

var twitter = new Twitter(config);

var error = function(err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function(data) {
    console.log('Data [%s]', data);
};
twitter.getUserTimeline({
    screen_name: 'BoyCook',
    count: '10'
}, error, success);

twitter.getMentionsTimeline({
    count: '10'
}, error, success);

twitter.getHomeTimeline({
    count: '10'
}, error, success);

twitter.getReTweetsOfMe({
    count: '10'
}, error, success);

twitter.getTweet({
    id: '1111111111'
}, error, success);


/*
http.createServer(function(req, res) {
    res.end();
}).listen(8070);
*/

/*-----------------Google Analytics-------------------*/
