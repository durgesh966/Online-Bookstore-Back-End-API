const client = require("../database/PostgreSQL");
const bcrypt = require("bcrypt");
const { jwtAuthMiddleware, generateToken } = require("../utils/jwt");
const sendEmail = require('../middleware/nodeMailer');
const { OTPgenrator, storeOTP, verifyOTP } = require("../utils/otp");

exports.AdminRegister = async (req, res) => {
  try {
    const { username, password, email, number, address, location, country } = req.body;
    const securePassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      'INSERT INTO admin (username, password, email, number, address, location, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [username, securePassword, email, number, address, location, country]
    );

    const payload = {
      id: result.id,
      email: result.email
    };
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({ response: result.rows[0], token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.AdminLogin = async (req, res) => {
  try {
    const { email, number, password } = req.body;
    if ((!email && !number) || !password) {
      res.status(400).json({ error: "Please check input field" });
    }
    const result = await client.query('SELECT * FROM admin WHERE email = $1 OR number = $2', [email, number]);
    if (result.rows.length === 0) {
      res.status(300).json({ error: "Admin not found" });
    }

    const user = result.rows[0];
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      res.status(400).json({ error: "Invalid password" });
    }
    const payload = {
      id: user.id,
      email: user.email
    };
    const token = generateToken(payload);
    console.log("Token is", token);

    res.status(201).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.UpdateAdmin = async (req, res) => {
  try {
    const { password, username, email, number, address, location, country } = req.body;
    const photos = req.file ? req.file.filename : null;

    if (!password || !username || !email || !number || !address || !location || !country || !photos) {
      res.status(400).json({ error: "Please check input field" });
    }
    const result = await client.query('SELECT * FROM admin WHERE email = $1 OR number = $2', [email, number]);
    if (result.rows.length === 0) {
      res.status(300).json({ error: "User not found" });
    }

    const user = result.rows[0];
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      res.status(404).json({ error: "Password is incorrect, please enter valid password" });
    }

    const updateResult = await client.query(
      'UPDATE admin SET username = $1, email = $2, number = $3, address = $4, location = $5, country = $6, photos = $7 WHERE email = $8 RETURNING *',
      [username, email, number, address, location, country, photos, email]
    );
    const output = updateResult.rows[0];

    return res.status(200).json({ user: output, message: "User Profile Update successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.GenerateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await client.query('SELECT * FROM admin WHERE email = $1', [email]);
    const admin = result.rows[0];

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Generate OTP
    const otp = OTPgenrator();
    console.log(otp);
    storeOTP(email, otp);

    // Send OTP via email
    const emailMessage = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Your OTP Online Book Store Account',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>OTP for Online Book Store Account</h2>
          <p>Your One-Time Password is <strong>${otp}</strong></p>
          <p>Thank you! Please keep this OTP confidential.</p>
          <br>
          <p>Online Book Store</p>
        </div>`
    };

    sendEmail.sendMail(emailMessage, (error, info) => {
      if (error) {
        console.error('Email send error:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.ForgotAdminPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Please provide an email." });
    }

    if (!verifyOTP(email, otp)) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    const securePassword = await bcrypt.hash(newPassword, 10);
    const result = await client.query('UPDATE admin SET password = $1 WHERE email = $2 RETURNING *', [securePassword, email]);
    const admin = result.rows[0];

    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    return res.status(200).json({ user: admin, message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.DeleteAdminAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Please provide an email." });
    }

    if (!verifyOTP(email, otp)) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    const result = await client.query('DELETE FROM admin WHERE email = $1 RETURNING *', [email]);
    const admin = result.rows[0];

    if (!admin) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
