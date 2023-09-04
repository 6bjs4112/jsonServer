const express = require('express')
const cors = require('cors');
const app = express();
const fs = require('fs');//모듈 불러오기, 설치 필요없
const bodyParser = require('body-parser')//설치 완

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//데이터 읽기
app.get('/abc', function (req, res) {
    //'http://localhost:3030/abc와 일치할때 출력
    // res.send('세 계 는 안 녕 하 십 니 까')
    // res.send({id:1, name:'chse'})
    const jsonData = fs.readFileSync('./test.json')
    res.send( JSON.parse(jsonData) );
})
//id 있는 get
app.get('/abc/:id', function (req, res) {
    const jsonData = fs.readFileSync('./test.json');
    const data = JSON.parse(jsonData);
    const {id} = req.params;
    const aaa = data.filter(n=> n.id == id)
    res.send( aaa );
})

//데이터 쓰기
app.post('/insert',function(req,res){
    console.log(req.body);
    // const jsonData = fs.writeFileSync('./test.json',JSON.stringify({id:3, name:'홍길동'}))
    const jsonData = fs.writeFileSync('./test.json',JSON.stringify(req.body));
    res.send('성공');//send는 빠져선 안됨=>안하면 계속 로딩이됨
})

app.listen(3030)//port번호임
