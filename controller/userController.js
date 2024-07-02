const client = require("../database/PostgreSQL");
const bcrypt = require("bcrypt");
const { jwtAuthMiddleware, generateToken } = require("../utils/jwt");
const sendEmail = require('../middleware/nodeMailer');

const { OTPgenrator, storeOTP, verifyOTP } = require("../utils/otp");

exports.register =  async (req, res) => {
  try {
    const { username, password, email, number, address, location, country } = req.body;
    const securePassword = await bcrypt.hash(password, 10);

    const result = await client.query('INSERT INTO users (username, password, email, number, address, location, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [username, securePassword, email, number, address, location, country])

    const payload = {
      id: result.id,
      email: result.email
    }
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({ response: result.rows[0], token: token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, number, password } = req.body;
    if (!email && !number || !password) {
      res.status(400).json({ error: "plese chack input field" });
    }
    const result = await client.query('SELECT * FROM users WHERE email = $1 OR number = $2 ', [email, number]);
    if (result.rows.length === 0) {
      res.status(300).json({ error: "user not found" });
    };

    const user = result.rows[0];
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      res.status(400).json({ error: "invalid password" });
    }
    const payload = {
      id: user.id,
      email: user.email
    }
    const token = generateToken(payload);
    console.log("token is", token);

    res.status(201).json({ message: "login successful", token: token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateUser =  async (req, res) => {
  try {
    const { password, username, email, number, address, location, country } = req.body;
    const photos = req.file ? req.file.filename : null;
    // console.log(photos);
    if (!password || !username || !email || !number || !address || !location || !country || !photos ) {
      res.status(400).json({ error: "plese chack input field" });
    }
    const result = await client.query('SELECT * FROM users WHERE email = $1 OR number = $2 ', [email, number]);
    if (result.rows.length === 0) {
      res.status(300).json({ error: "user not found" });
    };

    const user = result.rows[0];
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      res.status(404).json({ error: "passwor is incorrect plese enter valid password" });
    };

    const upsateResult = await client.query('UPDATE users SET username = $1, email = $2, number = $3, address = $4, location = $5, country = $6, photos = $7 WHERE email = $8 RETURNING *', [username, email, number, address, location, country, photos, email]);
    const output = upsateResult.rows[0];

    return res.status(200).json({ user: output, message: "User Profile Update successful." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.generateOTP = async (req, res) => {
  try {
    const { Email } = req.body;
    const result = await client.query('SELECT * FROM users WHERE Email = $1', [Email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = OTPgenrator();
    const email = user.email;
    console.log(otp);
    storeOTP(email, otp);
    // Send OTP via email
    const emailMessage = {
      from: process.env.EMAIL_USER,
      to: user.email,
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
}

exports.forgotpassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Please provide an email." });
    }

    if (!verifyOTP(email, otp)) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    const securePassword = await bcrypt.hash(newPassword, 10);
    const result = await client.query('UPDATE users SET password = $1 WHERE email = $2 RETURNING *', [securePassword, email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ user: user, message: "Password reset successfully." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Please provide an email." });
    }

    if (!verifyOTP(email, otp)) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    const result = await client.query('DELETE FROM users WHERE email = $1 RETURNING *', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};