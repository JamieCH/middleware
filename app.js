'use strict';

// 把index 裡的all 拿來用
var all = require('./index');
var koa = require('koa');
var app = koa();

// koa的機制console.log出來
// 如果只有用 all(); 來call function 的話 只有all 這個function的結果會出來 
app.use(all);

// 在localhost:8080頁面上顯示 hello world
app.use(function *(next){
    this.body = 'Hello World';
    yield next;
});

app.listen(8080);
