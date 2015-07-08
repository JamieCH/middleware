'use strict';

var koa = require('koa');
var app = koa();

module.exports = all;  // export module讓其他程式可以使用

function responseTime(prepend, append) {
    return function *(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        console.log('%s %s', prepend, ms, append);
    }
}

function logger(){
    return function *(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        console.log('%s %s - %s', this.method, this.url, ms);
    }
}

function *all(next){
    // 用call method 在logger middleware 裡面 call responseTime() middleware
    // 也可以先後順序交換 output就會不同
    yield logger().call(this, responseTime("response time", "ms").call(this, next));
}
