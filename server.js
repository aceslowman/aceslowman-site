const express = require('express');
const app = express();
const path = require('path');

var port = 3000;

const public_path = __dirname + '/public';

app.use(express.static('public'));

app.get('/', function(request,response){
  response.sendFile(public_path + '/index.html');
});

app.listen(port);
