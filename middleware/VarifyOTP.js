function verifyOTP(email, otp) {
    const storedOTP = otpStore[email];
    if (storedOTP && storedOTP.otp === otp && storedOTP.expiresAt > Date.now()) {
      delete otpStore[email];
      return true;
    }
    return false;
  }

  module.exports = verifyOTP;