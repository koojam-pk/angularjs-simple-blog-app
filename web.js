var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.header('Access-Control-Allow-Headers', 'authorization, content-type');
  next();
});

// app.use(bodyParser.urlencoded({'extended': 'true'}));
// app.use(bodyParser.json());
// app.use(bodyParser.json({'type': 'application/vnd.api+json'}));

// app.use(methodOverride());

app.get('*', (req, res) => {
  res.writeHead(301, {
    Location: "http" + (req.connection.encrypted ? "s" : "") + "://" + req.headers.host + '/#' + req.url
  });
  res.end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log('Server is running on ' + PORT)
});
