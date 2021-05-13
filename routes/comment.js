const { request } = require('express')
const express = require('express')
const router = express.Router()
var comment = [{
    user: 'username',
    commentAt: new Date(),
    courseComment: 'content of comment',
    usefulness:0
  }]

router.get('/new', (req, res) => {
    res.render('comment/new')
} )
router.get('/rate', (req, res) => {
    res.render('comment/rate')
} )
router.get('/classpage',(req,res)=>{
    res.render('comment/index', {comment: comment})  
})

router.post('/useful', (req,res) =>{
    let num = req.body.com
    comment[num].usefulness ++
    res.redirect('/comment/classpage')
})

router.post('/', (req,res) =>{
    const new_comment = {
        user: req.body.username,
        commentAt: new Date(),
        courseComment: req.body.comment,
        usefulness:0
    }
    comment.push(new_comment)
    res.redirect('/comment/classpage')
})

module.exports = router