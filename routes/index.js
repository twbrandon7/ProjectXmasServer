var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/play', function(req, res, next) {
  res.render('play', {  });
});

/* GET home page. */
router.get('/play2', function(req, res, next) {
  res.render('play2', {  });
});

module.exports = router;
