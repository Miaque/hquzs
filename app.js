var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
const mongoStore = require('connect-mongo')(session);
require('./models/users_model');

/*var routes = require('./routes/index');
var users = require('./routes/users');*/
var routes = require('./routes/routes');

var conn = mongoose.connect('mongodb://localhost/hquzs');
var app = express();

/*测试数据链接*/
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('succsss');
});*/
/*写入数据*/
/*User = mongoose.model('User');
var user = new User({
  username : "miaque",
  email : "miaque@163.com",
  password : "miaque",
  city : "xiamen"
});
user.save(function (err) {
  if (err) console.log(err);
  else {
    console.log("success");
  }
});*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret : 'SECRET',
  resave: false,
  saveUninitialized: true,
  store : new mongoStore({
    url: 'mongodb://localhost/hquzs',
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    collection : 'sessions'
  })
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
/*app.use('/users', users);*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
