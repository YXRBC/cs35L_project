const { request } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {classSchema} = require('./schema.js')
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

var comment = [{
    user: 'username',
    commentAt: new Date(),
    courseComment: 'content of comment',
    usefulness:0
  }]

//create new comment
router.get('/new', (req, res) => {
    res.render('comment/new')
} )
router.get('/rate', (req, res) => {
    res.render('comment/rate')
} )

//display classpage
router.get('/classpage',(req,res)=>{
    //req be class name ideal
    var display_class
    Class.find({name: 'TEST1'},function(err,response){
        if (err){
            console.log("error in finding class")
            throw err
        }
        display_class = response[0]
        res.render('comment/index', {comment: comment, class_id: display_class})  
    })
    //res.render('comment/index', {comment: comment, class_id: display_class})  
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
    res.redirect('/comment/classpage')
})


//update comment usefulness count
router.post('/useful', (req,res) =>{
    let num = req.body.com
    comment[num].usefulness ++
    res.redirect('/comment/classpage')
})

//update overall rating of the class
router.post('/rate', (req,res)=>{
    var display_class
    var class_name = req.body.class
    Class.find({name: class_name},function(err,response){
        if (err){
            console.log("can't find class")
            throw err
        }
        display_class = response[0]
        let num = req.body.rate *1
        let total = (display_class.overall_rating * display_class.num_rating) + num
        let rate_num = display_class.num_rating +1
        Class.findOneAndUpdate({name: class_name}, {overall_rating: total/rate_num, num_rating:rate_num}, function(err, response) {
            if(err){
                console.log("unsuccessful update of rating")
                throw err
            }
         })
         res.redirect('/comment/classpage')
    })
    //res.redirect('/comment/classpage')
})

//save new comment to database and display in classpage
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