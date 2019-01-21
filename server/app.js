const keys = require('./config/keys');
const bodyParser = require('body-parser');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var app = express();

// Connect to mongo DB
const mongoose = require("mongoose");
mongoose.connect(
  keys.mongo.url,
  { useNewUrlParser: true }
).then(() => {
  console.log('Connected to mongo')
}).catch(err => console.log(err));

// Enable CORS
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', apiRouter);
app.use("/api/v1", apiRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001, () => {
  console.log('Listeninf on port 3001')
})

module.exports = app;
