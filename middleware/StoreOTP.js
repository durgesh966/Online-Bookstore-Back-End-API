const otpStore = {};

function storeOTP(email, otp) {
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 minutes expiry
}

module.exports = storeOTP;