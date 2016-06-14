var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var controls = ['keyboard','mouse'];
  res.render('index', { title: 'Express', controls: controls });
});

module.exports = router;
