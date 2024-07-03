const { v4: uuidv4 } = require('uuid');

function cartID() {
    const timestamp = Date.now().toString(36);
    const randomPart = uuidv4().split('-').join('').slice(0, 6);

    return `${timestamp}-${randomPart}`;
}

module.exports = cartID;