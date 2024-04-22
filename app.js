var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var toysRouter = require('./routes/toy');

var app = express();


var mongoose = require('mongoose');
var url = "mongodb+srv://nguyenduongblue299:Koi12345678@cluster0.5whqr6w.mongodb.net/"
mongoose.connect(url)
  .then(() => { console.log("Can connect to DB") })
  .catch(() => { console.log(err) });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/toys', toysRouter);


const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log('App is running')
})

module.exports = app;
