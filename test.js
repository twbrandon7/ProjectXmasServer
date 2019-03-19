var express = require('express');
var app = express();
var http = require('http');
var expressWs = require('express-ws')(app);

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/', function (req, res, next) {
    console.log('get route', req.testing);
    res.end();
});

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
    });
    console.log('socket', req.testing);
});

// app.listen(3000);

app.listen(3000);
var server = http.createServer(app);
server.listen(3000);
// server.on('error', onError);
server.on('listening', function(){
    console.log("GO");
});
