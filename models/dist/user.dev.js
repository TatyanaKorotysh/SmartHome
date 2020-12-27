"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var schema = new Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  foto: {
    type: String
  },
  homeLogin: {
    type: String
  },
  template: {
    type: String
  },
  homeFoto: {
    type: String
  }
});
schema.set('toJSON', {
  virtuals: true
});
module.exports = mongoose.model('User', schema);