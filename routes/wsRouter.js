var express = require('express');

function init(expressWs, router) {
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', { title: 'Express2' });
    });

    router.ws('/echo', function (ws, req) {
        ws.on('message', function (msg) {
            ws.send(msg);
        });
    });
}

module.exports = function(app) {
    var expressWs = require('express-ws')(app);
    var router = express.Router();
    init(expressWs, router);
    return router;
};