const request = require('request');

var geocodeAddress = (address, callback) => {

    var addressEncodedURL = encodeURIComponent(address);

    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncodedURL}&key=AIzaSyAGiRK6e3U3AMkePm4wJrhq7Jizh9j3vhs`;

    request({
        url: url,
        json: true //tells requestjs to convert the data to json object!
    }, (error, response, body) => {
        //console.log(JSON.stringify(error, undefined, 2));
        //console.log(JSON.stringify(response, undefined, 2));
        if(error) {
            callback('Unable to connect to google service!');
        } else if(body.status === 'ZERO_RESULTS'){
            callback('Address not found!');
        } else if(body.status === 'INVALID_REQUEST') {
            console.log('Invalid request!');
        } else if(body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            //console.log(`Adress: ${body.results[0].formatted_address}`)
            //console.log(body.results[0].geometry.location.lat);
            //console.log(body.results[0].geometry.location.lng);
        }
    });
}

module.exports = {
    geocodeAddress
}