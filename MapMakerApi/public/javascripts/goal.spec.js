var goal = require('./goal');
var assert = require('chai').assert;
var fs = require("fs");


describe('goal', function() {
    describe('path functions', function () {
        it('should return false with empty data', function () {
            var data = null;
            var result = goal.defineGoal(data);
            assert.equal(result, false);
        });

        it('should return true with normal map', function (done) {
            fs.readFile( "data/" + "basicMap.json", 'utf8', function (err, data) {
                data = JSON.parse(data);
                var result = goal.defineGoal(data);
                assert.notEqual(result, false);
                done();
            });

        });

        it('should return false with no working paths', function (done) {
            fs.readFile( "data/" + "basicMap.json", 'utf8', function (err, data) {
                data = JSON.parse(data);
                data["posY6"]["posX5"]["pathRight"] = "Broken";
                data["posY6"]["posX6"]["pathRight"] = "Broken";
                data["posY5"]["posX6"]["pathDown"] = "Broken";
                data["posY6"]["posX6"]["pathDown"] = "Broken";

                var result = goal.defineGoal(data);
                assert.equal(result, false);
                done();
            });
        });

        it('should return goal if a working path exists', function (done) {
            fs.readFile( "data/" + "basicMap.json", 'utf8', function (err, data) {
                data = JSON.parse(data);
                data["posY6"]["posX5"]["pathRight"] = "Broken";
                data["posY6"]["posX6"]["pathRight"] = "Broken";
                data["posY5"]["posX6"]["pathDown"] = "Broken";
                data["posY12"]["posX6"]["pathRight"] = "Broken";

                var result = goal.defineGoal(data);
                var expectedGoal = result["posY3"]["posX12"]["Goal"];
                assert.isDefined(expectedGoal,"goal is not found");
                done();
            });
        });
    });
});