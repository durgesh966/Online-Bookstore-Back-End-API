const generator = require('generate-serial-number');
const randomString = require('randomized-string');
// const randonCartId = require("crypto-random-string");


// ---------- generating unique ID for Book Serial Number ------------ 
const bookSerialNumber = () => {
    return generator.generate(10);
};

// --------- Genrating Unique ID for Cart ---------

function cartID() {
    return randomString.generate({
        charset: 'number',
        length: 20,
      });
}

module.exports = { bookSerialNumber, cartID };