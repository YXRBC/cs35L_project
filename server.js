const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose')
const {url} = require('./db.js')
const indexRouter= require('./routes/index')
const {userRouter}= require('./routes/users')
const {isLogin} = require('./routes/users')
const commentRouter = require('./routes/comment')
const searchRouter = require('./routes/search')
const app = express()


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))
app.use('/comment', commentRouter)
app.use('/',indexRouter)
app.use('/',userRouter)

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use('/search',searchRouter)
app.use(express.static('public'));
app.get('/', (req, res)=> {
    res.redirect('/login')
})

// catch 404 and forward to error handler
app.use(function(req, res) {
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
