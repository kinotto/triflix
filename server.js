var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

var port = process.env.PORT || 3000;
app.set('port', port);
var server = http.createServer(app);
server.listen(port, function(){
  console.log('listening on port '+port);
});

app.use(express.static(path.join(__dirname , '/dist')));
