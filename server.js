var express = require('express');
var app = express();
var path = require('path');

app.listen(process.env.PORT | 3000, function(){
  console.log('server listen on port 3000 '+ __dirname);
});
app.use(express.static(path.join(__dirname + '/dist')));
