var https = require('http');

var server = https.createServer(function(request, response){
  response.writeHead(200, {'Content-Type':'text/html'});
  response.end('Hello node.js!!');
});

server.listen(8080, function(){
  console.log('Server is running...');
});