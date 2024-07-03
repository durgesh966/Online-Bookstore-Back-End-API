const client = require("../database/PostgreSQL");
const cartID = require("../utils/generateCartID");

exports.addCartRoute = async (req, res) => {
    try {
        const cart_id = cartID();
        console.log(cart_id);
        const { user_id, product_id, quantity } = req.body;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};