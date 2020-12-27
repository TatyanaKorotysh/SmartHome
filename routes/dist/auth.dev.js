"use strict";

var express = require('express');

var router = express.Router();

var User = require('../models/user');

var Device = require('../models/device');

router.post('/login', function (req, res) {
  var login = req.body.login;
  var password = req.body.password;

  if (!login || !password) {
    res.json({
      ok: false,
      error: 'Все поля должны быть заполнены!'
    });
  } else {
    User.findOne({
      login: login
    }).then(function (user) {
      if (!user) {
        res.json({
          ok: false,
          error: 'Введенные вами логин или пароль неверны!'
        });
      } else {
        if (user.password == password) {
          req.session.userId = user.id;
          req.session.userLogin = user.login;
          res.json({
            ok: true
          });
        } else {
          res.json({
            ok: false,
            error: 'Введенные вами логин или пароль неверны!'
          });
        }
      }
    })["catch"](function (err) {
      console.log(err);
      res.json({
        ok: false,
        error: 'Такого логина не существует!'
      });
    });
  }
});
router.post('/user', function (req, res) {
  console.log(req.body);
  var password = req.body.password;
  var confirm = req.body.confirm;
  var phone = req.body.phone;
  var email = req.body.email;

  if (!/^[a-zA-Z0-9]+$/.test(password)) {
    res.json({
      ok: false,
      error: 'Только латинские буквы и цифры!'
    });
  } else if (password.length < 6) {
    res.json({
      ok: false,
      error: 'Пароль должен содержать минимум 6 символов!'
    });
  } else if (password != confirm) {
    res.json({
      ok: false,
      error: 'Уведитесь что подтверждение пароля совпадает с самим паролем!'
    });
  } else if (phone != "" && !/^\+[0-9]+$/.test(phone)) {
    res.json({
      ok: false,
      error: 'Номер телефона может содержать только цифры!'
    });
  } else if (email != "" && !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)) {
    res.json({
      ok: false,
      error: 'Проверьте правильность ввода электронной почты!'
    });
  } else {
    User.updateOne({
      login: req.session.userLogin
    }, {
      $set: {
        password: password,
        phone: phone,
        email: email
      }
    }, function (err, result) {
      console.log(result);
      res.json({
        ok: true,
        mess: 'Данные успешно обновлены!'
      });
    });
  }
});
router.post('/add', function (req, res) {
  var name = req.body.name;
  var type = req.body.type;
  var room = req.body.room;

  if (!name || !type || !room) {
    res.json({
      ok: false,
      error: 'Все поля должны быть заполнены!'
    });
  } else {
    Device.create({
      login: name,
      userLogin: req.session.userLogin,
      room: room,
      type: type,
      condition: '0'
    }).then(function (post) {
      console.log(post.id);
    });
  }
});
module.exports = router;