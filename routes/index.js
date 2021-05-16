var express = require('express');
var router = express.Router();



//render login page
router.get('/login', (req, res) => {
  res.render('login',(''))
})

module.exports = router;
