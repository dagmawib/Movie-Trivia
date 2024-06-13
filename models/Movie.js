const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    choice: {
        type: String,
        required: true,
        unique: true
    },
    correct_answer: {
        type: String,
        required: true,
        unique: true
    }
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;