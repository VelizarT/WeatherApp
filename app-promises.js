const yargs = require('yargs');
const addressBook = require('./address-book.js');
const getForecast = require('./get-forecast.js');

let adressOptions = {
    describe: 'Include address',
    alias: 'a',
    string: true
};
let argv = yargs
    .command('default', 'Add defualt address', {
        address: adressOptions,
    })
    .command('check', 'Get temperature for an address', {
        address: adressOptions,
    })
    .help()
    .alias('help', 'h')
    .argv;

var command = argv._[0];
var userAddress = argv.a;
var addressEncodedURL;

if(command === 'default') {
    if(userAddress !== "") {
        addressBook.addAddress(userAddress);
    } else {
        console.log('Please, provide a default address.');
    }
}else if(command === 'check') {
    if(userAddress !== "") {
        addressEncodedURL = encodeURIComponent(userAddress);
        getForecast.getForecast(addressEncodedURL);
    } else {
        console.log('Please, provide an address.');
    }
} else if(command === undefined) {
    var address = addressBook.fetchAddress();
    addressEncodedURL = encodeURIComponent(address.address);
    getForecast.getForecast(addressEncodedURL);
} else {
    console.log('Command not recognized');
}



