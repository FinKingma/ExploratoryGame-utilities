var express = require('express');
var router = express.Router();
var mapmaker = require('./../public/javascripts/map');
var Q = require('q');

router.get('/', function(req, res, next) {
  var features = req.header('features');
  var bugs = req.header('bugs');
  console.log('features: ' + features);
  console.log('bugs: ' + bugs);

  if (features >= 1 && bugs >= 1) {
    var map = new mapmaker();

    try {
      var attempts = 0;
      var dataComplete;
      do {

        map.generateMap(function(data) {
          var dataF = map.addFeatures(data, features);
          var dataFB = map.addBugs(dataF, bugs);
          dataComplete = goal.defineGoal(dataFB);
          console.log('duss: ' + dataComplete);
          attempts++;

          console.log(dataComplete + " | " + attempts);
          if (dataComplete) {
            console.log('sending..');
            res.send(dataComplete);
          } else {
            var err = new Error('could not generate map with requested values');
            err.status = 418;
            next(err);
          }
        });
      }
      while (dataComplete === false && attempts < 3);



    } catch(err) {
      throw new Error();
    }
  } else {
    var err = new Error('provide features and bugs with values in header');
    err.status = 418;
    next(err);
  }
});

module.exports = router;

