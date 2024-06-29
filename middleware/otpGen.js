const otpGenerator = require('otp-generator')
const OTPgenrator = () => {
    const OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    return OTP;
}

console.log(OTPgenrator());
module.exports = OTPgenrator;
