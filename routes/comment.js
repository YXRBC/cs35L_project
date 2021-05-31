const { request } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {classSchema} = require('./schema.js')
const {commentSchema} = require('./schema.js')
const {url} = require('../db.js')
var {myStorage} = require('./users.js')

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


//create new comment
router.get('/new/:id', (req, res) => {
    if(myStorage.getItem('isLogin')===false){
       res.redirect('/login')
    }
    var class_id = req.params.id
    Class.findById(class_id).exec(function(err,response){
        if(err){
            console.log("error in finding class")
            throw err
        }
        class_post = response
        res.render('comment/new', {class: class_post})
    })
})

//display classpage
router.get('/classpage/:id',(req,res)=>{

    if(myStorage.getItem('isLogin')===false){
       res.redirect('/login')
    }

    var display_class
    var display_comment
    var class_id = req.params.id
    Class.findById(class_id).exec(function(err,response){
        if (err){
            console.log("error in finding class")
            throw err
        }
        display_class = response
       comment.find({class: display_class.name},function(err,response_1){
        if (err){
            console.log("error in finding class")
            throw err
        }
        display_comment = response_1.sort(function(a,b){return (b.commentAt-a.commentAt)})
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
    comment.findById(comment_id).exec(function(err,response){
        var useful = response.usefulness +1
        comment.findOneAndUpdate({_id: comment_id}, {usefulness: useful}, function(err_2, response_1) {
            if(err_2){
                console.log("unsuccessful update of rating")
                throw err
            }
         })
        Class.find({name: response.class}, function(err_1, class_get){
            if(err_1){
                console.log("unsuccessful update of rating, find class")
                throw err
            }
            let class_id = class_get[0]._id
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
        var num = req.body.rate *1
        var total = (display_class.overall_rating * display_class.num_rating) + num
        var rate_num = display_class.num_rating +1
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
router.post('/add_comment/:id', (req,res) =>{
    class_id = req.params.id
    Class.findById(class_id).exec(function(err,response){
        if(err){
            console.log("error in finding class")
            throw err
        }
        var new_comment = new comment ({
            class: response.name,
            user: myStorage.getItem('user'),
            commentAt: Date.now(),
            courseComment: req.body.comment,
            usefulness: 0
        })
        new_comment.save(function(err, comment){
            if(err){
                console.log("database error: fail to save new comment")
            }
            else{
                console.log("new comment added to database")
            }
        })
    })
    res.redirect('/comment/classpage/'+class_id)
})

module.exports = router
