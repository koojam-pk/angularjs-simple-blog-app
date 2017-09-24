var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.get('*', (req, res) => {
  res.writeHead(301, {
    Location: "http" + (req.socket.encrypted ? "s" : "") + "://" + req.headers.host + '/#' + req.url
  });
  res.end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log('Server is running on ' + PORT)
});
