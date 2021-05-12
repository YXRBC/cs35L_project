const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('comment/new')
} )

module.exports = router