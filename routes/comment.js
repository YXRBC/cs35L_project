const { request } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {classSchema} = require('./schema.js')
const {commentSchema} = require('./schema.js')
const {url} = require('../db.js')

//connect to database
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


var Class = mongoose.model("class",classSchema)

var comment = mongoose.model("comment",commentSchema)

/*var comment = [{
    user: 'username',
    commentAt: new Date(),
    courseComment: 'content of comment',
    usefulness:0
  }]*/

//create new comment
router.get('/new', (req, res) => {
    res.render('comment/new')
} )
router.get('/rate', (req, res) => {
    res.render('comment/rate')
} )

//display classpage
router.get('/classpage/:id',(req,res)=>{
    //req be class name ideal
    var display_class
    var display_comment
    var class_id = req.params.id
    Class.findById(class_id).exec(function(err,response){
        if (err){
            console.log("error in finding class")
            throw err
        }
        display_class = response
       // res.render('comment/index', {comment: display_comment, class_id: display_class}) 
       comment.find({class: display_class.name},function(err,response){
        if (err){
            console.log("error in finding class")
            throw err
        }
        display_comment = response
        res.render('comment/index', {comment: display_comment, class_id: display_class}) 
        }) 
    }) 
})

router.get('/add_class',(req,res)=>{
    res.render('comment/create')
})

//add a new class to the database
//add success only if the class isn't already in the database
router.post('/addition',(req,res)=>{
    var new_class = new Class({
        name: req.body.class_name,
        info: req.body.info,
        professors: req.body.professor,
        summary:req.body.summary,
        overall_rating: 0,
        num_rating: 0
    })
    Class.find({name: req.body.class_name},function(err,response){
        if (err){
            console.log("error in finding class")
            throw err
        }
        if(response.length > 0){
            console.log("class already exist in database")
        }
        else{
            new_class.save(function(err,Class){
                if(err){
                    console.log("database error: fail save new class")
                }
                else{
                    console.log("new class added to database")
                }
            })
        }
    })
    res.redirect('/comment/add_class')
})


//update comment usefulness count
router.post('/useful/:id', (req,res) =>{
    var comment_id = req.params.id
    var class_id = ''
    comment.findOneAndUpdate({_id: comment_id}, {usefulness: usefulness+1}, function(err, response) {
        if(err){
            console.log("unsuccessful update of rating")
            throw err
        }
        Class.find({name: response.class}, function(err_1, class_get){
            if(err_1){
                console.log("unsuccessful update of rating, find class")
                throw err
            }
            class_id = class_get[0]._id
            res.redirect('/comment/classpage/'+class_id)
        })
     })
    //res.redirect('/comment/classpage/'+class_id)
})

//update overall rating of the class
router.post('/rate/:id', (req,res)=>{
    var display_class
    var class_id = req.params.id
    Class.findById(class_id).exec(function(err,response){
        if (err){
            console.log("can't find class")
            throw err
        }
        display_class = response
        let num = req.body.rate *1
        let total = (display_class.overall_rating * display_class.num_rating) + num
        let rate_num = display_class.num_rating +1
        Class.findOneAndUpdate({_id: class_id}, {overall_rating: total/rate_num, num_rating:rate_num}, function(err, response) {
            if(err){
                console.log("unsuccessful update of rating")
                throw err
            }
         })
         res.redirect('/comment/classpage/'+class_id)
    })
    //res.redirect('/comment/classpage')
})


//save new comment to database 
router.post('/add_comment', (req,res) =>{
    var new_comment = new comment ({
        class: req.body.class,
        user: req.body.user,
        commentAt: Date(),
        courseComment: req.body.courseComment,
        usefulness: req.body.usefulness
    })
    new_comment.save(function(err, comment){
        if(err){
            console.log("database error: fail to save new comment")
        }
        else{
            console.log("new comment added to database")
        }
    })
    res.redirect('/comment/classpage')
})

module.exports = router
