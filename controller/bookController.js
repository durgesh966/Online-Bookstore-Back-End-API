const client = require("../database/PostgreSQL");

exports.uploadBookRoute = async (req, res) => {
    try {
        const { title, author, description, publisher, published_date, language, pages, price, quantity } = req.body;
        const photo = req.files['photo'] ? req.files['photo'][0].filename : null;
        const gallery = req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : null;

        if (!title || !author || !description || !publisher || !published_date || !language || !pages || !price || !quantity || !photo || !gallery) {
            return res.status(400).json({ error: "Please check all input fields" });
        }

        // Convert gallery to a JSON array
        const galleryJson = JSON.stringify(gallery);

        const result = await client.query(
            'INSERT INTO books (title, author, description, publisher, published_date, language, pages, price, quantity, photo, gallery) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [title, author, description, publisher, published_date, language, pages, price, quantity, photo, galleryJson]
        );
        const book = result.rows[0];

        res.status(201).json({ book: book, success: "Book added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};