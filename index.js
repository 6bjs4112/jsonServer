const express = require('express')
const cors = require('cors');
const fs = require('fs');//모듈 불러오기, 설치 필요없
const bodyParser = require('body-parser')//설치 완
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//이걸로 아래 코드 한번에 모으나요
const data = {
    select : function(){
        return JSON.parse( fs.readFileSync('./test.json') )
    },
    insert : function(newObj){
        const jsonData = data.select();
        const newData = [...jsonData, {id:jsonData.length+1, ...newObj  }]
        fs.writeFileSync('./test.json',JSON.stringify(newData) );
        return newData;
    },
    update : function(){},
    delete : function(){}
}

//데이터 읽기
app.get('/abc', function (req, res) {
    //'http://localhost:3030/abc와 일치할때 출력
    // res.send('세 계 는 안 녕 하 십 니 까')
    // res.send({id:1, name:'chse'})
    // const jsonData = fs.readFileSync('./test.json')
    // res.send( JSON.parse(jsonData) );
    res.send( data.select() );
})

//id 있는 get => delete로 사용가능
app.delete('/abc/:id', function (req, res) {
    // const jsonData = fs.readFileSync('./test.json');
    // const data = JSON.parse(jsonData);
    const jsonData = data.select();

    const {id} = req.params;
    const delData = jsonData.filter(n=> n.id != id)// ==를 !=로 바꿔서 삭제
    fs.writeFileSync('./test.json',JSON.stringify(delData) );
    res.send( delData );
})

//데이터 쓰기
app.post('/insert',function(req,res){
    // console.log(req.body);
    //한줄 댓글
    // const jsonData = data.select();
    
    // let data = [...jsonData, {id:jsonData.length+1, ...req.body}];
    // // console.log(jsonData); 근데 아이디가 이상하게 나와서 확인해보니 터미널에 이상한값 들어옴
    // // console.log(JSON.parse.jsonData); 읽어오는 데이터가 배열이 아닌 형태로 들어와서 parser써줌
    // fs.writeFileSync('./test.json',JSON.stringify(data));
    // res.send('성공');//send는 빠져선 안됨=>안하면 계속 로딩이됨
    // res.send(data);//데이터 반환
    res.send( data.insert(req.body) );
})

app.listen(3000)//port번호임
