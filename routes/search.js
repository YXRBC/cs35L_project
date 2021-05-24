const { request } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {classSchema} = require('./schema.js')
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

    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };



module.exports = router