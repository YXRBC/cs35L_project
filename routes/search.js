const { request } = require('express')
const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.render('search/search.html')  
})

module.exports = router