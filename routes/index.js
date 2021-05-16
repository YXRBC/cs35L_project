var express = require('express');
var router = express.Router();



//render login page
router.get('/login', (req, res) => {
  res.render('login',(''))
})

//render register page
router.get('/regist', (req, res) => {
  res.render('regist',(''))
})

module.exports = router;
