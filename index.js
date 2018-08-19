
// Dependencias
var http = require("http");
var url = require("url");
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

// Servidor que va a responder todos los request
var server = http.createServer(function(req,res){

	// Get the URL and parse it
	var parsedURL = url.parse(req.url, true);

	// Get the path
	var path = parsedURL.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');

	//get the query string as an object
	var queryStringObject = parsedURL.query;

	// Get method
	var method = req.method.toLowerCase();

	// Get the header as an Object
	var headers = req.headers;

	//Get the payload, if any
	var decoder = new StringDecoder('utf-8');
	var buffer = '';
	req.on('data', function(data){
		buffer += decoder.write(data);
	});

	req.on('end',function(){
		buffer += decoder.end();

		//Choose the handler this request shoul go to. If one is not
		var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

		//Construct the data object to send to handlers
		var data = {
			'trimmerPath': trimmedPath,
			'queryStringObject' : queryStringObject,
			'method' : method,
			'headers' : headers,
			'payload' : buffer
		};

		chosenHandler(data, function(statusCode, payload){

			//Use the status code called back by the handler, or default
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

			//Use the pauload  called back by the handler, or default to empty object
			payload = typeof(payload) == 'object' ? payload : {};

			// Convert the payload to a string_decoder
			var payloadString = JSON.stringify(payload);

			res.setHeader('Content-Type', 'application/json');
			res.writeHeader(statusCode);
			res.end(payloadString);

			console.log('Returning this response', statusCode, payloadString);

		});

	});


});

server.listen(config.port, function(){
		console.log("Servidor Master Class en puerto " + config.port);
});

// Define the handlers
var handlers = {};

// Sample handlers
handlers.hello = function(data, callback){
   // Callback a http status code , and a payload object
   callback(406,{'name' : 'hellow world, this is my first homework in master class'});
};

// Not found hanlder
handlers.notFound =  function(data, callback){
	callback(404);
};

// Define a request router
var router = {
	'hello' : handlers.hello
}
