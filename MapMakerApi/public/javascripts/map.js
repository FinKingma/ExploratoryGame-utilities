var express = require('express');
var router = express.Router();
var fs = require("fs");
var goal = require('./goal');

var lines = 13;


var mapmaker = function(features, bugs) {
  this.features = features;
  this.bugs = bugs;
};

mapmaker.prototype.generateMap = function(done) {
  var data;
  fs.readFile( "data/" + "basicMap.json", 'utf8', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    done(data);
  });
};

mapmaker.prototype.addFeatures = function(data,features) {
  var implementedFeatures = 0;
  //total open paths 96 horizontal + 96 vertical = 192
  //500 is used to reduce the random chance to have more features in the top left area of the map
  var featureChance = parseInt((500 / features));

  do {
    for (var y = 0; y < lines; y ++) {
      for (var x = 0; x < lines; x ++) {
        if (data["posY"+y]["posX"+x]["pathRight"] === "Open") {
          if (Math.floor((Math.random()*featureChance) + 1) === 1 && implementedFeatures < features) {
            data["posY"+y]["posX"+x]["pathRight"] = "Feature";
            implementedFeatures++;
          }
        }
        if (data["posY"+y]["posX"+x]["pathDown"] === "Open") {
          if (Math.floor((Math.random()*featureChance) + 1) === 1 && implementedFeatures < features) {
            data["posY"+y]["posX"+x]["pathDown"] = "Feature";
            implementedFeatures++;
          }
        }
      }
    }
  }
  while (implementedFeatures < features);
  return data;
};

mapmaker.prototype.addBugs = function(data, bugs) {
  var implementedBugs = 0;
  //total open paths 96 horizontal + 96 vertical = 192
  //500 is used to reduce the random chance to have more bugs in the top left area of the map
  var bugChance = parseInt((500 / bugs));
  do {
    for (var y = 0; y < lines; y ++) {
      for (var x = 0; x < lines; x ++) {
        if (data["posY"+y]["posX"+x]["pathRight"] === "Working") {
          if (Math.floor((Math.random()*bugChance) + 1) === 1 && implementedBugs < bugs) {
            data["posY"+y]["posX"+x]["pathRight"] = "Broken";
            implementedBugs++;
          }
        }
        if (data["posY"+y]["posX"+x]["pathDown"] === "Working") {
          if (Math.floor((Math.random()*bugChance) + 1) === 1 && implementedBugs < bugs) {
            data["posY"+y]["posX"+x]["pathDown"] = "Broken";
            implementedBugs++;
          }
        }
      }
    }
  }
  while (implementedBugs < bugs);
  return data;
};


module.exports = mapmaker;