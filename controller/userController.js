const client = require("../database/PostgreSQL");
const bcrypt = require("bcrypt");
const { jwtAuthMiddleware, generateToken } = require("./jwt");
const sendEmail = require('../config/email');

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
        const { number, email } = req.query;
        if (!number && !email) {
            res.status(400).json({ erorr: "please provide a email or number any of this" });
        };
        const result = await client.query('DELETE FROM users WHERE number = $1 OR email = $2', [number, email]);
        const user = result.rows[0];

        // ------ send otp ----
        const emailMessage = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Yuer OPT for Deleting accounto',
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>New Job Application</h2>
            <p><strong>${OTP}</strong> has applied for the position of <strong>${job.title}</strong>.</p>
            <p>Thank you!</p>
            <p>We will get back to you as soon as possible.</p>
            <br>
            <p>Best regards,</p>
            <p>Company Name</p>
            </div>`
          };
        sendEmail.sendEmail({

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};