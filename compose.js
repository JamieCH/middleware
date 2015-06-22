var compose = require('koa-compose');
var bodyParser = require('koa-body-parser');
var koa = require('koa');
var app = module.exports = koa();

function *responseTime(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    //console.log('ms:', ms);
}

function *logger(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    if('test' != process.env.NODE_ENV){
        console.log('%s %s - %s', this.method, this.url, ms);
    }
}

function *respond(next){
    yield next;
    if('/' != this.url) return;
    this.body = 'Hello world';
    //request http header and body
    console.log('Header:', this.request.header);
    app.use(bodyParser()); 
    app.use(function *(){
        this.body = this.request.body;
    });
}

var all = compose([
    responseTime,
    logger,
    respond
]);

app.use(all);

if(!module.parent) app.listen(3000);
