"use strict";var config=require("./config"),mongoose=require("mongoose");module.exports=function(){return new Promise(function(o,n){mongoose.Promise=global.Promise,mongoose.set("debug",!0),mongoose.connection.on("error",function(o){return n(o)}).on("close",function(){return console.log("Database connection closed.")}).once("open",function(){return o(mongoose.connections[0])}),mongoose.connect(config.MONGO_URL,{useNewUrlParser:!0})})};