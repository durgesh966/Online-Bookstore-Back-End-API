const client = require("../database/PostgreSQL");
const { cartID } = require("../utils/generateUniqueID's");

exports.addCartRoute = async (req, res) => {
    try {
        const cart_id = cartID();
        const { user_id, product_id, quantity } = req.body;

        if (!cart_id || !user_id || !product_id || !quantity) {
            return res.status(400).json({ error: "Fill all input fields correctly" });
        }

        const cartData = await client.query(
            'INSERT INTO cart (cart_id, user_id, product_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [cart_id, user_id, product_id, quantity]
        );

        const cartInfo = cartData.rows[0];

        if (!cartInfo) {
            return res.status(400).json({ error: "Failed to add item to cart" });
        }

        res.status(200).json({ cartInfo: cartInfo });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getCartRoute = async (req, res) => {
    try {
        const { cartID } = req.params;
        if (!cartID) {
            return res.status(500).json({ error: "Please Provide a Cart ID" });
        };
        const cartData = await client.query("SELECT * FROM cart WHERE cart_id = $1", [cartID]);
        const cartInfo = cartData.rows[0];
        if (!cartInfo) {
            return res.status(404).json({ error: "Card Information Not Found." });
        }
        res.status(200).json({ cart: cartInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteCartRoute = async (req, res)=>{
  
};