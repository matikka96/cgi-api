const keys = require('./config/keys');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');

var app = express();

const mongoose = require("mongoose");
mongoose.connect(
  keys.mongo.url,
  { useNewUrlParser: true }
).then(() => {
  console.log('Connected to mongo')
}).catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + "/"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', apiRouter);
app.use("/api", apiRouter);
app.use('/users', usersRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get("/", (req, res) => {
  // res.sendFile(__dirname + '/test.html');
  res.sendFile(__dirname + "/test.html");
});

app.listen(3001, () => {
  console.log('Listeninf on port 3001')
})

module.exports = app;
