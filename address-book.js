const fs = require('fs');

var fetchAddress = () => {
    try {
        var addressString = fs.readFileSync('address-data.json');
        return JSON.parse(addressString);
    } catch (e) {
        return [];
    }
}

var saveAddress = (address) => {
    fs.writeFileSync('address-data.json', JSON.stringify(address));
    console.log('Address added as default!');
}

var addAddress = (address) => {

    var addressObj = {
        address
    }

    saveAddress(addressObj);
    
};

var removeAddress = (address) => {
    var addressInDatabase = fetchAddress();
    if(address === addressInDatabase) {
        saveAddress('');
    }
    return notes.length !== notesNotRemoved.length;
};

module.exports = {
    fetchAddress,
    saveAddress,
    removeAddress,
    addAddress
}

