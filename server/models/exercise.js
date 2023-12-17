const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this holds the schema for each quiz
const exerciseSchema = new Schema({
    language: String,
    question: String,
    option1: String,
    option2:String,
    level:String,
    correct: String
});

module.exports = mongoose.model('Exercise', exerciseSchema);

