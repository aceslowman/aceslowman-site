const express = require('express');
const app = express();

var port = 3001;

app.use(express.static(__dirname + '/public'));

app.get('/', function(request,response){
  response.sendFile('index.html');
}).listen(port);
