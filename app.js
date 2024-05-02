var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
const cron = require('node-cron');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var ticketsRouter = require('./routes/tickets');

var app = express();

// get config vars
dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('', usersRouter);
app.use('/events', eventsRouter);
app.use('/tickets', ticketsRouter);

cron.schedule('0 0 * * *', () => {
  notifyUsers();
});

module.exports = app;
