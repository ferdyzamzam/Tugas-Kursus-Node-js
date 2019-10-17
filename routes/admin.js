var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let data = {
    layout: 'admin',
    title: 'Dashboard',
    content: 'Selamat Datang Admin...'
  };
  res.render('dashboard', data);
});

module.exports = router;