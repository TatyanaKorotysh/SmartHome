"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var schema = new Schema({
  login: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
schema.set('toJSON', {
  virtuals: true
});
module.exports = mongoose.model('Comment', schema);