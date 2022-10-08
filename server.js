var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
const port = 3000;

const fs1 = require('fs');
// fs1이라는 변수 설정
fs1.readFile('./customer.json', 'utf8', (err, data) => {
  // fs의 함수 중 하나인 readFile을 사용, customer.json 파일을 받아온다.
  if (err){
    // 에러 처리
    console.log('File read failed:', err);
    return;
  }
  try{ // try ... catch 문
    const customer = JSON.parse(data);
    // 새로운 변수 customer을 이용하여 data를 JSON 파싱한다.
    console.log('Customer address is:', customer.address);
    // 그 중, 주소(address)만 사용하기 위한 명령어
  } catch(err){
    console.log('Error parsing JSON:', err);
  }
  console.log('File data:', data);
  // data 전체 출력
});

var server = http.createServer(function(request, response){

  if (request.method == 'GET'){
    fs.readFile('./index.html', 'utf8', function(error, data){
      //fs.readFile 함수를 이용, 현재 만들어진 html 파일인 index.html 파일을 localhost에 띄워준다
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end(data);
    });
  }
  else if(request.method == 'POST'){
    //POST에서 들어온 아이디, 비밀번호를 chunk에 담고
    request.on('data', function(chunk){
      console.log(chunk.toString());
      //chunk에 담은 데이터를 string, 문자열화 한 후
      var data = querystring.parse(chunk.toString());
      //querystring 안의 parse 함수를 이용하여 파싱한다. 
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end('ID : ' + data.id + ' PW : ' + data.pw + ' Submit : ' + data.submit);
    });
  }
}).listen(port, function(){
  console.log('Server is running...');
});