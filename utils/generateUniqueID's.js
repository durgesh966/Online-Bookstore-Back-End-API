const generator = require('generate-serial-number');
const { uid } = require("uid");


// ---------- generating unique ID for Book Serial Number ------------ 
const bookSerialNumber = () => {
    return generator.generate(10);
};

// --------- Genrating Unique ID for Cart ---------

function cartID() {
    return uid(20);
}

module.exports = { bookSerialNumber, cartID };