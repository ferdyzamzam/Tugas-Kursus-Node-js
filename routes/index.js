var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myhotel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', function () {
  console.log("database terconnect");
});

const User = mongoose.model('users', {
  email: String,
  password: String
});

/* GET home page. */
router.get('/', function (req, res, next) {
  let data = {
    layout: 'frontend',
    title: 'Home-hotel',
    content: 'Apps pertama saya'
  };
  res.render('index', data);
});

router.get('/login', function (req, res, next) {
  res.render('login');
});


router.post('/login', function (req, res, next) {
  let data = req.body;

  User.find({
    email: data.email
  }, function (err, docs) {
    if (docs[0].password === data.password) {
      res.redirect('/admin');
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/init_user', function (req, res, next) {
  let user = new User({
    email: 'admin@gmail.com',
    password: '12345678'
  });
  user.save().then((resData) => {
    res.send('Init User berhasil');
  });
});

router.get('/logout', function (req, res, next) {
  res.redirect('/login');
});

module.exports = router;