const otpStore = {};

function storeOTP(email, otp) {
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 minutes expiry
  return otpStore[email];
}

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

module.exports = { storeOTP, verifyOTP };
