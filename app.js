var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = require('url');

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wsRouter = require('./routes/wsRouter')(app);

var Twig = require('twig'), // Twig module
  twig = Twig.twig;       // Render function

var prefix = process.env.PREFIX;
var siteURL = process.env.SITE_URL;

var urlPrefix = "";
if(prefix != "") {
  urlPrefix = prefix.replace(/\.\/(.*?)/gi, "/");
  if(urlPrefix.charAt(urlPrefix.length-1) == "/") {
    urlPrefix = urlPrefix.substring(0, urlPrefix.length-1);
  }
}

Twig.extendFunction('assets', function (path) {
  if(path.charAt(0) == "/") {
    path = "." + path;
  }
  if(urlPrefix == "") {
    return url.resolve(siteURL, path)+"";
  } else {
    x = url.resolve(siteURL, urlPrefix)
    if(x.indexOf("/") != x.length-1) {
        x = x + "/";
    }
    x = url.resolve(x, path);
    return x+"";
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.set('twig globals', {
  title: 'page title'
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(urlPrefix, express.static('public'));
app.use(urlPrefix + '/', indexRouter);
app.use(urlPrefix + '/users', usersRouter);
app.use(urlPrefix + '/ws', wsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
