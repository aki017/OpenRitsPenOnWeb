
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , net = require('net');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

var httpserver = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(httpserver);
io.sockets.on('connection',function(socket){
  socket.on('message',function(data){
    if(data && typeof data.value === 'string'){
      //socket.broadcast.json.emit('message',{value:data.value});
    }
  });
});

// RitsPen Listener
var server = net.createServer(function(c) {
  var ip = c.remoteAddress;
  var port = c.remotePort;
  hash=md5_hex("aki"+port+"hash"+ip);
  console.log('server connected :'+ip+':'+port+" as "+hash);
  c.on('end',  function() {
    console.log('server disconnected');
  });
  c.on('data',  function(data) {
    io.sockets.json.emit("message", {hash:hash, value:data.toString('utf8')});
    c.write(data);
  });
  c.on('error',  function(){});
  c.write('hello\r\n');
});
server.listen(4242,  function() {
  console.log('server bound');
});


var crypto = require('crypto');

function md5_hex(src) {
  var md5 = crypto.createHash('md5');
  md5.update(src,  'utf8');
  return md5.digest('hex');
}
