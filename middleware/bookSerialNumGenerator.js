const serialNumber = require('serial-number');

const bookSerialNumber = serialNumber(function (err, value) {
    // console.log(value);
    return value;
});

module.exports = { bookSerialNumber };