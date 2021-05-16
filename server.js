var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');const express = require('express')

const indexRouter= require('./routes/index')
const commentRouter = require('./routes/comment')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use('/comment', commentRouter)
app.use('/',indexRouter)

app.get('/', (req, res)=> {
    res.send('waiting for homepage')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000)
