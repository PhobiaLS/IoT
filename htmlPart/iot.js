var express = require('express');
var httpClient = require('http');
var app = new express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('public'));

server.listen(3000);    
console.log("Express server listening at 3000");
