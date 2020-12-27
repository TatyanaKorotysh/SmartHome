"use strict";

var app = require('./app');

var database = require('./database');

var config = require('./config');

database().then(function (info) {
  console.log("Connected to ".concat(info.host, ":").concat(info.port, "/").concat(info.name));
  app.listen(config.PORT, function () {
    return console.log("Example app listening on port ".concat(config.PORT, "!"));
  });
})["catch"](function () {
  console.error('Unable to connect to database');
  process.exit(1);
});