const request = require('request');

var getForecast = (lat, lng, callback) => {

    var url = `https://api.darksky.net/forecast/665f7498ad8965682001332b863e5b2a/${lat},${lng}?units=si`;

    request({
        url: url,
        json: true //tells requestjs to convert the data to json object!
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Dark Sky service!');
        } else if(response.statusCode === 400) {
            callback('Bad request.');
        } else if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fatch weather!');
        }
    });
}

module.exports = {
    getForecast
}