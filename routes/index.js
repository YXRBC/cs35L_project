var express = require('express');
var router = express.Router();
var model = require('../model');


//render login page
router.get('/login', function(req, res, next){
  res.render('login',(''))
})

module.exports = router;
