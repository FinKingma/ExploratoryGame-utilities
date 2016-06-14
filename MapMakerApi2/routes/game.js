var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.render('game', { controls: req.body.controls });
});

module.exports = router;
