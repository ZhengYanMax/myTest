"use strict";

var express = require('express');

var app = express();
app.use(express.urlencoded({
  extended: true
}));

var router = require('./router');

app.use('/', router);
app.use(express["static"]('upload')); // app.get('/in',(req,res)=>{
// res.send({status:200})
// })

app.listen(8888, function () {
  console.log('8888端口已开启');
});