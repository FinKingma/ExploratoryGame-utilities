var pactJs = require('pact-js-provider');

var timeout = 4000;

var _mocha = require('mocha');
var _mocha2 = _interopRequireDefault(_mocha);
var _lodash = require('lodash');
var _lodash2 = _interopRequireDefault(_lodash);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

pactJs.timeout = 2000;

pactJs.runPact = function() {
    var mocha = new _mocha2.default({
        ui: 'pact_dsl',
        timeout: pactJs.timeout
    });

    for (var _len = arguments.length, tests = Array(_len), _key = 0; _key < _len; _key++) {
        tests[_key] = arguments[_key];
    }

    tests.forEach(function (test) {
        mocha.addFile(test);
    });

    mocha.run(pactJs.onFailure);
};

pactJs.onFailure = function(failures) {
    process.on('exit', function () {
        if (failures) {
            throw new Error(failures);
        } else {
            process.exit(failures);
        }
    });
};

module.exports = pactJs;