var fs = require("fs");
var mapmaker = require('../map');

var map={
    generator:function(){
        var features;
        var bugs;
        var map = new mapmaker();

        this.setFeatures = function(n){
            features=n;
        }
        this.setBugs = function(n){
            bugs=n;
        }
        this.generatedPaths = function(){
            return {
                then:function(fulfill,reject){
                    fs.readFile('../data/basicMap.json', function (err, data) {
                        data = JSON.parse(data);
                        var result;
                        result = map.addFeatures(data,features);
                        result = map.addBugs(data,bugs);
                        var resultString = JSON.stringify(data);
                        var workingPaths = (resultString.match(/Working/g) || []).length;
                        var featurePaths = (resultString.match(/Feature/g) || []).length;
                        if (err) {
                            reject(err);
                        }
                        fulfill(workingPaths + featurePaths);   
                    });      
                }
            }
        }
    }
};


module.exports={
    map:map
}