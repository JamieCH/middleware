'use strict';

var koa = require('koa');
var app = module.exports = koa();

module.exports = responseTime;

function responseTime(prepend, append) {
    return function *(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        console.log('$s - %s %s', prepend, ms, append);
    }
}

app.use(responseTime("response time", "ms"));
app.use(function *(next){
    this.body = 'Hello World';
    yield next;
});
app.listen(3000);

