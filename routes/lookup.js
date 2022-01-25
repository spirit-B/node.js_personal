const { filter } = require("async");
const express = require("express");
const Boards = require('../schemas/boardSchema') // db 불러오기
const bodyParser = require('body-parser'); // body-parser 요청
const { format } = require("express/lib/response");
const { findOneAndUpdate, db } = require("../schemas/boardSchema");
const router = express.Router();


router.use(bodyParser.urlencoded({extended: true}));

// json 형식의 데이터를 파싱
router.use(bodyParser.json())

// 글쓰기 데이터 저장 -> app.js : app.use(express.json())
router.post('/toWrite', async (req, res) => {
    const { name, title, createDate, password, contents } = req.body;
    
    // model을 생성하면서 insert까지 해줌
    let createdData = await Boards.create({ name, title, createDate, password, contents })
    res.json({ createdData })
});

// 메인 페이지 데이터 불러오기
router.get('/fromWrite', async (req, res) => {
    const createdData = await Boards.find();
    res.json({list: createdData});
});

// 다른 js 파일에서 참조하기 위한 명령어
module.exports = router;
