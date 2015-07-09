'use strict';

// 把index 裡的all 拿來用
var all = require('./index');
var koa = require('koa');
var app = koa();

// koa的機制 output result 
app.use(all);

// 在localhost:8080頁面上顯示 hello world
app.use(function *(next){
    this.body = 'Hello World';
    yield next;
});

app.listen(8080);
