var assert = require('chai').assert;
var mapmaker = require('./map');
var fs = require("fs");


describe('the mapmaker', function() {
    var map = new mapmaker();

    it('should generate a json map', function (done) {
        var result = map.generateMap(function(result) {
            assert.equal(result["posY0"]["posX0"]["pathRight"],"Working");
            done();
        });
    });

    it('should contain the exact amount of bugs that were requested', function (done) {
        fs.readFile( "data/" + "basicMap.json", 'utf8', function (err, data) {
            data = JSON.parse(data);
            var result = map.addFeatures(data,"3");
            var resultString = JSON.stringify(result);
            var features = (resultString.match(/Feature/g) || []).length;
            assert.equal(features, 3);
            done();
        });
    });

    it('should contain the exact amount of bugs that were requested', function (done) {
        fs.readFile( "data/" + "basicMap.json", 'utf8', function (err, data) {
            data = JSON.parse(data);
            var result = map.addBugs(data,"3");
            var resultString = JSON.stringify(result);
            var bugs = (resultString.match(/Broken/g) || []).length;
            assert.equal(bugs, 3);
            done();
        });

    });
});