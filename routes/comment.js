const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('comment/new')
} )
router.get('/rate', (req, res) => {
    res.render('comment/rate')
} )

router.post('/', (req,res) =>{

})

module.exports = router