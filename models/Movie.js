const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    choice: [{
        type: String,
        required: true,
    }],
    correct_answer: {
        type: String,
        required: true,
    }
});

const HIMYMSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    choice: [{
        type: String,
        required: true,
    }],
    correct_answer: {
        type: String,
        required: true,
    }
});

const OfficeSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    choice: [{
        type: String,
        required: true,
    }],
    correct_answer: {
        type: String,
        required: true,
    }
});

const HIMYM = mongoose.model("HIMYM", HIMYMSchema);
const Office = mongoose.model("Office", OfficeSchema);
const Friends = mongoose.model("Friends", FriendsSchema);

module.exports = {Friends, HIMYM, Office};