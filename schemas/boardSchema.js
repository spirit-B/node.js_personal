const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, '제목을 입력하세요.' ]
    },
    name: {
        type: String,
        required: [true, '이름을 입력하세요.']
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: Number,
        required: [true, '비밀번호를 입력하세요.']
    },
    contents: {
        type: String
    }
});

module.exports = mongoose.model('Board', boardSchema);