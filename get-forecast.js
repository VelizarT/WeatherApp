const axios = require('axios');

var getForecast = (address) => {
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAGiRK6e3U3AMkePm4wJrhq7Jizh9j3vhs`;
    axios.get(geocodeUrl)
    .then((response) => {
        if(response.data.status=== 'ZERO_RESULTS' || response.data.status=== 'INVALID_REQUEST') {
            throw new Error('Unable to find address');
        }
        // console.log(JSON.stringify(response.data.results[0].geometry.location.lat));
        var forecastUrl = `https://api.darksky.net/forecast/665f7498ad8965682001332b863e5b2a/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}?units=si`;
        console.log(response.data.results[0].formatted_address);
        // console.log(response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng);
        return axios.get(forecastUrl);
    })
    .then((response) => {
        // console.log(JSON.stringify(response.data, undefined, 2));
        console.log(`The temperature is ${response.data.currently.temperature}. Feels like ${response.data.currently.apparentTemperature}. ${response.data.currently.summary}`);
    })
    .catch((error) => {
        if(error.code === 'ENOTFOUND') {
            console.log('Cannot conect to server.');
        } else {
            console.log(error.message);
        }
        // console.log(error);
    });
}

module.exports = {
    getForecast
}