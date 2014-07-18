var http  = require('http');
var delay = typeof process.env.DELAY === 'undefined' ?
  2000 : +process.env.DELAY;

http.createServer(function(req, res) {
  var body = '';

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    setTimeout(function() {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(body);
    }, delay);
  });
}).listen(process.env.PORT || 5000);
