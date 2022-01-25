const express = require("express"); //express 패키지를 불러온다.
const connect = require('./schemas')
const Boards = require('./schemas/boardSchema')
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const port = 3000;
const ejs = require('ejs');

// mongoDB 접속
connect();

// 라우터 호출
const lookupRouter = require('./routes/lookup');
const router = require("./routes/lookup");
const { data } = require("jquery");

// 라우터를 여러개 쓸때만 배열 형태로 사용함
app.use('/api', lookupRouter)

// express에서 body로 전달된 데이터를 json 형식으로 읽기 위함
app.use(express.json());


app.use(bodyParser.urlencoded({extended: true}));

// json 형식의 데이터를 파싱
app.use(bodyParser.json())

app.use('/node_modules', express.static(path.join('/node_modules')))

// view 엔진 설정
app.set('view engine', 'ejs');
// views 폴더에 있는 ejs 파일 불러오기
app.set('views', './views');

// 게시글 목록 조회
app.get('/', (req, res) => {
    res.render('index');
});

// 게시글 작성 페이지
app.get('/write', (req, res) => {
    res.render('write');
});

// 게시글 조회 페이지
app.get('/inboard/:id', async (req, res) => {
    const { id } = req.params;
    const writedData = await Boards.findById(id);
    res.render('inboard', {list: writedData})
});

// 글쓴 데이터 삭제
app.post('/inboard/:id', async (req, res) => {
    const { id } = req.params;
    const detailData = await Boards.findById(id);
    if (detailData['password'] === Number(req.body.password)) {
        await Boards.deleteOne({ _id: id });
        res.json({success: '삭제했습니다!'});
    }
    else {
        res.json({fail: '비밀번호가 다릅니다.'})
    }
})


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});