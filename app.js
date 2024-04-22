var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var toysRouter = require('./routes/toys');

var app = express();


var mongoose = require('mongoose');
var url = "mongodb+srv://nguyenduongblue299:Koi12345678@cluster0.5whqr6w.mongodb.net/"
mongoose.connect(url)
  .then(() => { console.log("Can connect to DB") })
  .catch(() => { console.log(err) });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var bodyParser = require('bodyParser')
app.use(bodyParser.urlencoded({ extended: false }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/toys', toysRouter);

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

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Running')
})

module.exports = app;
