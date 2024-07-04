const client = require("../database/PostgreSQL");
const { cartID } = require("../utils/generateUniqueID's");

exports.getAllCartRoute = async (req, res) => {
    try {
        const userID = req.params;
        const user_id = userID.user_Id;
        // console.log(userID, user_id);
        if (!user_id) {
            return res.status(400).json({ error: "Please Provide a User ID" });
        }

        const cartData = await client.query("SELECT * FROM cart WHERE user_id = $1", [user_id]);
        const cartItems = cartData.rows;

        if (cartItems.length === 0) {
            return res.status(404).json({ error: "No Cart Information Found." });
        }

        res.status(200).json({ cart: cartItems });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

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

        await client.query('INSERT INTO cart_history (cart_id, user_id, product_id, action, quantity) VALUES ($1, $2, $3, $4, $5)', [cart_id, user_id, product_id, 'add', quantity]);
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

exports.deleteCartRoute = async (req, res) => {
    try {
        const { cartID } = req.params;

        if (!cartID) {
            return res.status(400).json({ error: "Please provide a Cart ID" });
        }

        const cartData = await client.query("DELETE FROM cart WHERE cart_id = $1 RETURNING *", [cartID]);

        if (cartData.rowCount === 0) {
            return res.status(404).json({ error: "Cart information not found." });
        }

        res.status(200).json({ success: "Cart item deleted successfully", cart: cartData.rows[0] });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllHistoryRoute = async (req, res) => {
    try {
        const historyData = await client.query('SELECT * FROM cart_history');

        if (historyData.rows.length === 0) {
            return res.status(404).json({ error: "No history found" });
        }

        res.status(200).json({ history: historyData.rows });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.cartFullHistoryRoute = async (req, res) => {
    try {
        const { history_id } = req.params;

        if (!history_id) {
            return res.status(400).json({ error: "History ID is required" });
        }

        const historyData = await client.query('SELECT * FROM cart_history WHERE history_id = $1', [history_id]);

        if (historyData.rows.length === 0) {
            return res.status(404).json({ error: "History not found" });
        }

        res.status(200).json({ history: historyData.rows[0] });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
