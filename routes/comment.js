const { request } = require('express')
const express = require('express')
const router = express.Router()
var comment = [{
    user: 'username',
    commentAt: new Date(),
    courseComment: 'content of comment',
    usefulness:0
  }]
var class_id = {
    name: 'class_name',
    info: 'basic_info',
    professors: 'prof_name',
    summary:'course_content_summary',
    overall_rating: 0,
    num_rating: 0
}

router.get('/new', (req, res) => {
    res.render('comment/new')
} )
router.get('/rate', (req, res) => {
    res.render('comment/rate')
} )
router.get('/classpage',(req,res)=>{
    res.render('comment/index', {comment: comment, class_id: class_id})  
})

router.post('/useful', (req,res) =>{
    let num = req.body.com
    comment[num].usefulness ++
    res.redirect('/comment/classpage')
})

router.post('/rate', (req,res)=>{
    let num = req.body.rate *1
    if(class_id.overall_rating === null){
        class_id.overall_rating = num
        class_id.num_rating = 1
    }
    else{
        let total = (class_id.overall_rating * class_id.num_rating) + num
        let rate_num = class_id.num_rating +1
        class_id.overall_rating = total/rate_num
        class_id.num_rating ++
    }
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