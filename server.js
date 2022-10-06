var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
const port = 3000;

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
      response.end('ID : ' + data.id + 'PW : ' + data.pw);
    });
  }
}).listen(port, function(){
  console.log('Server is running...');
});