var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if (!process.env.MAPMAKER_PORT) throw new Error('"MAPMAKER_NAME" env variable is required!');
  var mmaurl = process.env.MAPMAKER_PORT;
  
  res.render('game', { controls: req.body.controls, skipWait: req.body.skipWait, mmaurl: mmaurl });
});

module.exports = router;
