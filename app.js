var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
var indexRouter = require('./routes/index');
var listsRouter = require('./routes/lists');
var tasksRouter = require('./routes/tasks');
var userRouter = require('./routes/user');
var authMiddleware = require('./middleware/auth');
var boardsRouter = require('./routes/boards');
var foldersRouter = require('./routes/folders');

dotenv.config();
connectDB();

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lists', authMiddleware, listsRouter);
app.use('/tasks', authMiddleware, tasksRouter);
app.use('/user', userRouter);
app.use('/boards', authMiddleware, boardsRouter);
app.use('/folders', authMiddleware, foldersRouter);

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
