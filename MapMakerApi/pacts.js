process.env.PROVIDER = 'MapMakerApi';
process.env.CONSUMER = 'ExploratoryTestingGame';
if (!process.env.PROVIDER) throw new Error('use environment variable PROVIDER to specify a provider for this testrun!');
if (!process.env.CONSUMER) throw new Error('use environment variable CONSUMER to specify a consumer for this testrun!');

var pactJs = require('./utils/pact_overrider.js');
var fs = require('fs');
var exec = require('child_process').exec;

var provider = process.env.PROVIDER;
var consumer = process.env.CONSUMER;

pactJs.timeout = 4000;

//Bij grotere projecten (meerdere providers / consumers) moet het onderstaande gerund worden voor iedere consumer bij de geselecteerde provider.
var pactURL = 'http://localhost:8080/pacts/provider/'+provider+'/consumer/'+consumer+'/latest';
//pactJs.runPact('./pacts/tests/'+consumer+'-'+provider+'.js');

exec('curl '+pactURL,
    function (error, stdout, stderr) {
        if (error !== null) throw error;

        var dataJson = JSON.parse(stdout);
        dataJson.consumer = {"name":consumer};
        dataJson.provider = {"name":provider};

        var prettyPlease = JSON.stringify(dataJson,null,"\t");

        fs.writeFile('pacts/contracts/'+consumer+'-'+provider+'.json', prettyPlease, function(err) {
            if (err) throw err;
            console.log('Latest pact file succesfully retrieved + saved!');

            pactJs.runPact('./pacts/tests/'+consumer+'-'+provider+'.js');
        });
    });