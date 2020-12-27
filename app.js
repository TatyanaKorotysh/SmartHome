const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const objectId = require("mongodb").ObjectID;
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);


const User = require('./models/user');
const Device = require('./models/device');
const Comment = require('./models/comment');

const routes = require('./routes');
const config = require('./config');

const app = express();

app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    '/javascripts',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);
app.use('/api/auth', routes.auth);

var userName;
var templates = [
    ["Коридор", "Прихожая", "Ванная", "Кухня", "Спальня"],
    ["Коридор", "Прихожая", "Ванная", "Кухня", "Спальня", "Детская"],
    ["Коридор", "Прихожая", "Ванная", "Кухня", "Спальня", "Детская", "Гостинная"]
];
var types = ['Розетки', 'Климат-контроль', 'Солнцезащитные конструкции', 'Бытовые приботы', 'Освещение'];

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/user', (req, res) => {
    userName = req.session.userLogin;
    User.findOne({ login: userName }).then(users => {
        res.render('user', {
            userName: users.login,
            password: users.password,
            phone: users.phone,
            email: users.email
        })
    })
});
app.get('/home', (req, res) => {
    User.findOne({ login: userName }).then(users => {
        console.log(users.template);
        res.render('home', {
            userName: users.login,
            homeName: users.homeLogin,
            template: users.template
        })
    })
});
app.get('/devices', (req, res) => {
    User.findOne({ login: userName }).then(users => {
        Device.find({ userLogin: users.login }).then(devices => {
            res.render('devices', {
                userName: users.login,
                types: types,
                templates: templates[users.template],
                devices: devices
            });
        });
    })
});
app.get('/help', (req, res) => {
    User.findOne({ login: userName }).then(users => {
        res.render('help', {
            userName: users.login,
            email: users.email
        })
    })
});
app.get('/add', (req, res) => {
    User.findOne({ login: userName }).then(users => {
        res.render('add', {
            userName: users.login,
            types: types,
            templates: templates[users.template]
        });
    })
});
app.get('/edit/:id', (req, res) => {
    User.findOne({ login: userName }).then(users => {
        let slice = req.params.id.slice(1);
        const id = new objectId(slice);

        Device.findOne({ _id: id }).then(devices => {
            console.log(devices);
            res.render('edit', {
                userName: users.login,
                types: types,
                templates: templates[users.template],
                device: devices
            });
        });
    })
});
app.get('/about', (req, res) => {
    User.findOne({ login: userName }).then(users => {
        Comment.find({}).then(comments => {
            console.log(comments);
            res.render('about', {
                userName: users.login,
                comments: comments
            });
        })
    })
});
app.get('*', (req, res) => {
    User.findOne({ login: userName }).then(users => {
        res.render('404', {
            userName: users.login
        })
    })
});

app.post('/user', (req, res) => {
    User.findOne({ login: userName }).then(users => {
        res.send({
            password: users.password,
            phone: users.phone,
            email: users.email
        });
    })
});
app.post('/home', (req, res) => {
    const { homeLogin, template, submit } = req.body;

    if (submit == "save") {
        User.findOne({ login: userName }).then(users => {
            User.updateOne({ login: users.login }, {
                    $set: {
                        homeLogin: (homeLogin) ? req.body.homeLogin : users.homeLogin,
                        template: (template) ? req.body.templat : users.template,
                    }
                },
                function(err, result) {
                    console.log(result);
                    res.json({
                        mess: 'Данные успешно обновлены!',
                    });
                }
            );
        })
    }
    if (submit == "cancel") {
        User.findOne({ login: userName }).then(users => {
            res.send({
                homeLogin: users.homeLogin,
                template: users.template
            });
        })
    }
});
app.post('/add', (req, res) => {
    const { name, type, room } = req.body;
    if (name != null && type != null && room != null) {
        Device.create({
            login: name,
            userLogin: userName,
            room: room,
            type: type,
            condition: '0'
        }).then(post => {
            res.redirect('/devices');
            console.log(post.id)
        });
    }
});
app.post('/help', (req, res) => {
    const { name, email, mess } = req.body;

    console.log(name + " - " + email + ": " + mess);
});
app.post('/about', (req, res) => {
    const { text } = req.body;

    if (req.body.save) {
        if (text != null) {
            Comment.create({
                login: userName,
                text: text
            }).then(post => {
                console.log(post.id)
                res.redirect('/about')
            });
        }
    }
    if (req.body.cancel) {
        res.redirect('/about');
    }
});
app.post('/edit/:id', (req, res) => {
    let slice = req.params.id.slice(1);
    const id = new objectId(slice);

    if (req.body.save) {
        Device.findOne({ _id: id }).then(devices => {
            Device.updateOne({ _id: id }, {
                    $set: {
                        login: (req.body.name) ? req.body.name : devices.login,
                        room: (req.body.room) ? req.body.room : devices.room,
                        type: (req.body.type) ? req.body.type : devices.type,
                    }
                },
                function(err, result) {
                    console.log(result);
                    res.redirect('/devices');
                }
            );
        });
    }
    if (req.body.cancel) {
        res.redirect('/devices');
    }
});
app.delete("/devices/:id", function(req, res) {
    const id = req.params.id;
    Device.findByIdAndDelete(id, function(err, device) {
        if (err) return console.log(err);
        res.send(device);
    });
});
app.post("/devices/:value", function(req, res) {
    const value = req.params.value;

    User.findOne({ login: userName }).then(users => {
        console.log(value);
        console.log(templates[users.template].indexOf(value));
        console.log(types.indexOf(value));

        if (types.indexOf(value) == -1 && templates[users.template].indexOf(value) == -1) {
            //on/off
            Device.findOne({ _id: value }).then(devices => {
                console.log(devices);
                Device.updateOne({ _id: value }, {
                        $set: {
                            condition: (devices.condition == '1') ? '0' : '1',
                        }
                    },
                    function(err, result) {
                        console.log(result);
                        Device.findOne({ _id: value }).then(devices => {
                            res.send(devices.condition);
                        });
                    }
                )
            });
        } else {
            //sort
            Device.find({ $or: [{ room: value }, { type: value }] }).then(devices => {
                res.send(devices);
            });
        }
    });
});

module.exports = app;