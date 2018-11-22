/* global process */
var express = require('express');
var path = require('path');
var app = express();

// app.use(express.static(path.resolve(process.cwd() + '/public/static')));
// app.use(express.static(path.resolve(process.cwd() + '/public/assets')));
app.use(express.static(path.resolve(process.cwd() + '/public')));
app.use('/rtc', express.static(path.resolve(process.cwd() + '/rtcchatexample')));

app.get('/rtc/example', function(req, res) {
  res.sendFile(path.resolve(process.cwd() + '/rtcchatexample/index.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.resolve(process.cwd() + '/public/index.html'));
});

app.listen(3005, () => {
  console.log(process.env.NODE_PORT);
  console.log(`Server is listening on port:${3005}. !!!!!!!!`);
});
