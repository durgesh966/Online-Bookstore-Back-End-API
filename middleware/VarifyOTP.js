const storeOTP = require("./StoreOTP");

function verifyOTP(email, otp) {
    const storedOTP = storeOTP[email];
    if (storedOTP && storedOTP.otp === otp && storedOTP.expiresAt > Date.now()) {
      delete storeOTP[email];
      return true;
    }
    return false;
  }

  module.exports = verifyOTP;