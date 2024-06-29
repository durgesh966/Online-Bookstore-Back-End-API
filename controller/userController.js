const client = require("../database/PostgreSQL");
const bcrypt = require("bcrypt");
const { jwtAuthMiddleware, generateToken } = require("./jwt");
const sendEmail = require('../middleware/nodeMailer');
const OTP = require("../middleware/otpGen");

exports.register = async (req, res) => {
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

exports.deleteAccount = async (req, res) => {
    try {
        const { email, number } = req.query;

        if (!number && !email) {
            return res.status(400).json({ error: "Please provide an email or number." });
        }

        const result = await client.query('DELETE FROM users WHERE number = $1 OR email = $2 RETURNING *', [number, email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Generate OTP
        const RealOTP = OTP();
        console.log(RealOTP);

        // Send OTP via email
        const emailMessage = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Your OTP for Deleting Online Book Store Account',
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>OTP for Account Deletion</h2>
                <p>Your One-Time Password is <strong>${RealOTP}</strong></p>
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

        res.status(200).json({ message: "OTP sent to email." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};