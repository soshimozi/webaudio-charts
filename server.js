var http = require('http');
var express = require('express'),
    app = module.exports.app = express(),
    server = http.createServer(app),
    path=require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    port = 3000;

app.use(express.static('./build/www'));

// configure Express
app.use(cookieParser());
app.use(session({ secret: 'kdasdf8232@#(W*asd9',
    saveUninitialized: true,
    resave: true }));

server.listen(port);  //listen on port 8080
console.log("Listening on port " + port);