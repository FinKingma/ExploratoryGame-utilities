
if (!process.env.PROVIDER) throw new Error('use environment variable PROVIDER to specify a provider for this testrun!');
if (!process.env.PACTBROKERURL) throw new Error('use environment variable pactbrokerurl to specify the environment of pact broker!');

var pactJs = require('./utils/pact_overrider.js');
var fs = require('fs');
var exec = require('child_process').exec;

var provider = process.env.PROVIDER;
var pactUrl = 'http://' + process.env.PACTBROKERURL;

var pactProviderUrl = pactUrl+'/pacts/provider/'+provider + '/latest';

pactJs.timeout = 60000;

function runPact(consumer,provider) {
    console.log('running for ./pacts/tests/'+consumer.name+'-'+provider+'.js');
    pactJs.runPact('./pacts/tests/'+consumer.name+'-'+provider+'.js');
}

function savePact(data, consumer) {
    var dataJson;
    try {
        dataJson = JSON.parse(data);
    }
    catch(err) {
        throw err;
    }
    if (!dataJson.consumer) dataJson.consumer = {"name":consumer.name};
    if (!dataJson.provider) dataJson.provider = {"name":provider};

    var prettyPlease = JSON.stringify(dataJson,null,"\t");

    fs.writeFile('pacts/contracts/'+consumer.name+'-'+provider+'.json', prettyPlease, function(err) {
        if (err) throw err;
        console.log('Latest pact file succesfully retrieved + saved!');

        fs.access('./pacts/tests/'+consumer.name+'-'+provider+'.js', fs.F_OK, function(err) {
            if (err) throw err;
        });

        runPact(consumer,provider);
    });
}

function checkPacts(err, stdout, stderr) {
    if (err) {
        console.log('error found...');
        throw err;
    }

    var dataJson;

    try {
        dataJson = JSON.parse(stdout);
    } catch(err) {
        console.log("the response from the pactbroker server could not be translated to a json object:\n");
        console.log(stdout);
        return;
    }

    var pacts = dataJson._links.pacts;

    if (pacts.length === 0) {
        console.log('no pact files found.');
    }
    
    pacts.forEach(function(consumer) {
        exec('curl '+consumer.href, function(err,stdout,stderr) {
            if (err) throw err;

            savePact(stdout, consumer);
        });
    })
}

//get pacts for this provider
if (process.env.TAG) pactProviderUrl += ('/' + process.env.TAG);

console.log('retrieving pacts from ' + pactProviderUrl);
exec('curl '+pactProviderUrl, checkPacts);