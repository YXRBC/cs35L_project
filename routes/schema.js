const mongoose = require('mongoose')

var classSchema = mongoose.Schema({
    name: String,
    info: String,
    professors:String,
    summary:String,
    overall_rating: Number,
    num_rating:Number
})

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    password2: String
})

var commentSchema = mongoose.Schema({
   // class: String,
    user: String,
    commentAt: Date,
    courseComment: String,
    usefulness: Number
})

module.exports = {classSchema, userSchema, commentSchema}

