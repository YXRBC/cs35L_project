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
    Class.find({},function(err, classes){
    res.render('search/search',{
        classesList: classes
    }) } 
)})

module.exports = router