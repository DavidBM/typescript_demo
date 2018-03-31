require('./typescript-requirer.js');

var Jasmine = require('jasmine');
var runner = new Jasmine();

runner.loadConfigFile('./specs/jasmine.json');
runner.configureDefaultReporter({
    showColors: true
});
runner.execute();
