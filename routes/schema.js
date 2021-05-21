const mongoose = require('mongoose')

var classSchema = mongoose.Schema({
    name: String,
    info: String,
    professors:String,
    summary:String,
    overall_rating: Number,
    num_rating:Number
})

module.exports = {classSchema}