'use strict';

var koa = require('koa');
var app = module.exports = koa();

module.exports = all;
function responseTime(prepend, append) {
    return function *(next) {
        var start = new Date;
        yield next;
        var ms = new Date - start;
        console.log('$s - %s %s', prepend, ms, append);
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
    yield responseTime("response time", "ms").call(this, logger().call(this, next));
}
app.use(all);
app.use(function *(next){
    this.body = 'Hello World';
    yield next;
});
app.listen(3000);

