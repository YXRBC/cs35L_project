const { request } = require('express')
const express = require('express')
const router = express.Router()
var comment = [{
    user: 'username',
    commentAt: new Date(),
    courseComment: 'content of comment'
  }]

router.get('/new', (req, res) => {
    res.render('comment/new')
} )
router.get('/rate', (req, res) => {
    res.render('comment/rate')
} )
router.get('comment',(req,res)=>{
    console.log(comment)
    res.render('../comment/index',{comment:comment})
})

router.post('/', async(req,res) =>{
    const new_comment = await{
        user: req.body.username,
        commentAt: new Date(),
        courseComment: req.body.comment
    }
    comment.push(new_comment)
    console.log(comment)
    res.redirect('/')
})

module.exports = router