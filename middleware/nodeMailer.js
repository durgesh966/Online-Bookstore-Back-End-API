const nodemailer = require('nodemailer');

const sendEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

sendEmail.verify((error, success) => {
  if (error) {
    console.error('sendEmail configuration error:', error);
  } else {
    console.log('sendEmail is ready to send emails:', success);
  }
});

module.exports = sendEmail;
