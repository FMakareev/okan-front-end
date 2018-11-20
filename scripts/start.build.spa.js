/* global process */
var express = require('express');
var path = require('path');
var app = express();

// app.use(express.static(path.resolve(process.cwd() + '/public/static')));
// app.use(express.static(path.resolve(process.cwd() + '/public/assets')));
app.use(express.static(path.resolve(process.cwd() + '/public')));

app.get('*',function (req,res) {
  res.sendFile(path.resolve(process.cwd() + '/public/index.html'));
});

app.listen(3000);
