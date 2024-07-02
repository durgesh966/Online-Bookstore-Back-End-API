const otpGenerator = require('otp-generator');
// generate otp
const OTPgenrator = () => {
    const OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    return OTP;
}

// store otp
const otpStore = {};

function storeOTP(email, otp) {
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 minutes expiry
  return otpStore[email];
}

// varify give otp
function verifyOTP(email) {
  const record = otpStore[email];
  if (!record) {
    return null; 
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return null;
  }

  return record.otp;
}

module.exports = { OTPgenrator, storeOTP, verifyOTP, };