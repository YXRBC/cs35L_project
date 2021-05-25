const { request } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {classSchema} = require('./schema.js')
const {commentSchema} = require('./schema.js')
const {url} = require('../db.js')

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


router.get('/',(req,res)=>{
    var noMatch=null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all classes from DB
        Class.find({name: regex}, function(err, allClasses){
           if(err){
               console.log(err);
           } else {
              if(allClasses.length < 1) {
                  noMatch = "No classes match that query, please try again.";
              }
              res.render("search/newsearch",{classesList:allClasses, noMatch: noMatch});
           }
        });
    } else {
        // Get all classes from DB
        Class.find({}, function(err, allClasses){
           if(err){
               console.log(err);
           } else {
              res.render("search/newsearch",{classesList:allClasses, noMatch: noMatch});
           }
        });
    }})

    router.get("/:id", function(req, res){
        //find the campground with provided ID
        Class.findById(req.params.id).exec(function(err, foundClass){
            if(err){
                console.log(err);
            } else {
                console.log(foundClass)
                //render show template with that class
                res.redirect('/comment/classpage')
            }
        })
    });


    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };



module.exports = router