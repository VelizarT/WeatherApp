const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

var adressOptions = {
    describe: 'Include address',
    demand:true,
    alias: 'a',
    string: true
};
var argv = yargs
    .options({
        address: adressOptions
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        forecast.getForecast(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It is ${weatherResults.temperature} C. It feels like ${weatherResults.apparentTemperature}.`);
            }
        });
    }

});


