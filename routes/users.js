var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const {userSchema} = require('./schema.js')
const {url} = require('../db.js')

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
var User = mongoose.model("user",userSchema)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//register API
router.post('/regist', function(req, res, next){
  var data = {
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2
  }
  //verification

  model.connect(function(db){
    db.collection('users').insertOne(data, function(err, ret){
      if(err) {
        console.log('registration fails.')
        res.redirect('/regist')
      } else {
        res.redirect('/login')
      }
    })
  })
})

//login API
router.post('/login', function(req, res,next) {
  var data = {
    username: req.body.username,
    password: req.body.password
  }
  model.connect(function(db){
    db.collection('users').find(data).toArray(function(err, docs) {
      if(err) {
        res.redirect('/login')
      } else {
        if (docs.length > 0) {
          //successful login, save the session
          req.session.username = data.username
          res.redirect('/')
        } else {
          res.redirect('/login')
        }
      }
    })
  })
})


module.exports = router;
