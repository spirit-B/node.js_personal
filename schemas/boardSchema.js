const { ISO_8601 } = require('moment');
const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: Number,
        required: true
    },
    contents: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Board', boardSchema);