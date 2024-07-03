const generator = require('generate-serial-number');

const bookSerialNumber = () => {
    return generator.generate(10);
};

module.exports = bookSerialNumber;
