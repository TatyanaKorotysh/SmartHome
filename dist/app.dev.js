"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var objectId = require("mongodb").ObjectID;

var session = require('express-session');

var mongoose = require('mongoose');

var MongoStore = require('connect-mongo')(session);

var User = require('./models/user');

var Device = require('./models/device');

var Comment = require('./models/comment');

var routes = require('./routes');

var config = require('./config');

var app = express();
app.use(session({
  secret: config.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/javascripts', express["static"](path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/api/auth', routes.auth);
var userName;
var templates = [["Коридор", "Прихожая", "Ванная", "Кухня", "Спальня"], ["Коридор", "Прихожая", "Ванная", "Кухня", "Спальня", "Детская"], ["Коридор", "Прихожая", "Ванная", "Кухня", "Спальня", "Детская", "Гостинная"]];
var types = ['Розетки', 'Климат-контроль', 'Солнцезащитные конструкции', 'Бытовые приботы', 'Освещение'];
app.get('/', function (req, res) {
  res.render('index');
});
app.get('/user', function (req, res) {
  userName = req.session.userLogin;
  User.findOne({
    login: userName
  }).then(function (users) {
    res.render('user', {
      userName: users.login,
      password: users.password,
      phone: users.phone,
      email: users.email
    });
  });
});
app.get('/home', function (req, res) {
  User.findOne({
    login: userName
  }).then(function (users) {
    console.log(users.template);
    res.render('home', {
      userName: users.login,
      homeName: users.homeLogin,
      template: users.template
    });
  });
});
app.get('/devices', function (req, res) {
  User.findOne({
    login: userName
  }).then(function (users) {
    Device.find({
      userLogin: users.login
    }).then(function (devices) {
      res.render('devices', {
        userName: users.login,
        types: types,
        templates: templates[users.template],
        devices: devices
      });
    });
  });
});
app.get('/help', function (req, res) {
  User.findOne({
    login: userName
  }).then(function (users) {
    res.render('help', {
      userName: users.login,
      email: users.email
    });
  });
});
app.get('/add', function (req, res) {
  User.findOne({
    login: userName
  }).then(function (users) {
    res.render('add', {
      userName: users.login,
      types: types,
      templates: templates[users.template]
    });
  });
});
app.get('/edit/:id', function (req, res) {
  User.findOne({
    login: userName
  }).then(function (users) {
    var slice = req.params.id.slice(1);
    var id = new objectId(slice);
    Device.findOne({
      _id: id
    }).then(function (devices) {
      console.log(devices);
      res.render('edit', {
        userName: users.login,
        types: types,
        templates: templates[users.template],
        device: devices
      });
    });
  });
});
app.get('/about', function (req, res) {
  User.findOne({
    login: userName
  }).then(function (users) {
    Comment.find({}).then(function (comments) {
      console.log(comments);
      res.render('about', {
        userName: users.login,
        comments: comments
      });
    });
  });
});
app.get('*', function (req, res) {
  User.findOne({
    login: userName
  }).then(function (users) {
    res.render('404', {
      userName: users.login
    });
  });
});
app.post('/user', function (req, res) {
  User.findOne({
    login: userName
  }).then(function (users) {
    res.send({
      password: users.password,
      phone: users.phone,
      email: users.email
    });
  });
});
app.post('/home', function (req, res) {
  var _req$body = req.body,
      homeLogin = _req$body.homeLogin,
      template = _req$body.template,
      submit = _req$body.submit;

  if (submit == "save") {
    User.findOne({
      login: userName
    }).then(function (users) {
      User.updateOne({
        login: users.login
      }, {
        $set: {
          homeLogin: homeLogin ? req.body.homeLogin : users.homeLogin,
          template: template ? req.body.templat : users.template
        }
      }, function (err, result) {
        console.log(result);
        res.json({
          mess: 'Данные успешно обновлены!'
        });
      });
    });
  }

  if (submit == "cancel") {
    User.findOne({
      login: userName
    }).then(function (users) {
      res.send({
        homeLogin: users.homeLogin,
        template: users.template
      });
    });
  }
});
app.post('/add', function (req, res) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      type = _req$body2.type,
      room = _req$body2.room;

  if (name != null && type != null && room != null) {
    Device.create({
      login: name,
      userLogin: userName,
      room: room,
      type: type,
      condition: '0'
    }).then(function (post) {
      res.redirect('/devices');
      console.log(post.id);
    });
  }
});
app.post('/help', function (req, res) {
  var _req$body3 = req.body,
      name = _req$body3.name,
      email = _req$body3.email,
      mess = _req$body3.mess;
  console.log(name + " - " + email + ": " + mess);
});
app.post('/about', function (req, res) {
  var text = req.body.text;

  if (req.body.save) {
    if (text != null) {
      Comment.create({
        login: userName,
        text: text
      }).then(function (post) {
        console.log(post.id);
        res.redirect('/about');
      });
    }
  }

  if (req.body.cancel) {
    res.redirect('/about');
  }
});
app.post('/edit/:id', function (req, res) {
  var slice = req.params.id.slice(1);
  var id = new objectId(slice);

  if (req.body.save) {
    Device.findOne({
      _id: id
    }).then(function (devices) {
      Device.updateOne({
        _id: id
      }, {
        $set: {
          login: req.body.name ? req.body.name : devices.login,
          room: req.body.room ? req.body.room : devices.room,
          type: req.body.type ? req.body.type : devices.type
        }
      }, function (err, result) {
        console.log(result);
        res.redirect('/devices');
      });
    });
  }

  if (req.body.cancel) {
    res.redirect('/devices');
  }
});
app["delete"]("/devices/:id", function (req, res) {
  var id = req.params.id;
  Device.findByIdAndDelete(id, function (err, device) {
    if (err) return console.log(err);
    res.send(device);
  });
});
app.post("/devices/:value", function (req, res) {
  var value = req.params.value;
  User.findOne({
    login: userName
  }).then(function (users) {
    console.log(value);
    console.log(templates[users.template].indexOf(value));
    console.log(types.indexOf(value));

    if (types.indexOf(value) == -1 && templates[users.template].indexOf(value) == -1) {
      //on/off
      Device.findOne({
        _id: value
      }).then(function (devices) {
        console.log(devices);
        Device.updateOne({
          _id: value
        }, {
          $set: {
            condition: devices.condition == '1' ? '0' : '1'
          }
        }, function (err, result) {
          console.log(result);
          Device.findOne({
            _id: value
          }).then(function (devices) {
            res.send(devices.condition);
          });
        });
      });
    } else {
      //sort
      Device.find({
        $or: [{
          room: value
        }, {
          type: value
        }]
      }).then(function (devices) {
        res.send(devices);
      });
    }
  });
});
module.exports = app;