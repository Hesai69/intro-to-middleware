var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var app = express();

// mounting middleware
app.use(morgan('combined'));

// use favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(function (req, res, next) {
  console.log('1 Incoming request. Hello!');
  next();
});

app.use(function (req, res, next) {
  console.log('2 I am next.');
  next();
});

app.use(function(req, res, next) {
  console.log('3 I am after next', req.method, req.url, req.user);
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  fs.readFile('./index.html', 'utf-8', function(err, data){
    if (err) throw err;
    res.set('Content-Type', 'text/html');
    res.send(data);
  });
});

app.get('/about', function(req, res) {
  res.redirect('/bio.html');
});

var port = 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
