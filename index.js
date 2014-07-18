var http  = require('http');
var delay = typeof process.env.DELAY === 'undefined' ?
  2000 : +process.env.DELAY;

http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  var fn = process.env.RESPONSE ? playbackResponse : replayBody;

  fn(req, function(body) {
    setTimeout(function() {
      res.end(body);
    }, delay);
  });
}).listen(process.env.PORT || 5000);

function playbackResponse(req, cb) {
  cb(process.env.RESPONSE);
}

function replayBody(req, cb) {
  var body = '';

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    cb(body);
  });
}
