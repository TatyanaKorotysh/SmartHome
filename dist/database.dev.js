"use strict";

var config = require('./config');

var mongoose = require('mongoose');

module.exports = function () {
  return new Promise(function (resolve, reject) {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    mongoose.connection.on('error', function (error) {
      return reject(error);
    }).on('close', function () {
      return console.log('Database connection closed.');
    }).once('open', function () {
      return resolve(mongoose.connections[0]);
    });
    mongoose.connect(config.MONGO_URL, {
      useNewUrlParser: true
    });
  });
};