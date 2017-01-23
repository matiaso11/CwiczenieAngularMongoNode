//Lets require/import the HTTP module
var http = require('http');
var https = require('https');
var routes = require('./routes.js');

const PORT = 8081;


var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/cwiczenie1db';

/*https.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(res){
		console.log(res);
		});*/

http.createServer(function (req, res){
  routes.go(req, res);
}).listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
