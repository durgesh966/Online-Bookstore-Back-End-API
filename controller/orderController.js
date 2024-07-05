const client = require("../database/PostgreSQL");
const { orderID } = require("../utils/generateUniqueID's");

exports.addOrderRoute = async (req, res) => {
    try {
        const order_id = orderID();
        // console.log(order_id);
        const { user_id, total_amount, address_line1, address_line2, city, state, postal_code, country } = req.body;

        if (!order_id || !user_id || !total_amount || !address_line1 || !city || !state || !postal_code || !country) {
            return res.status(400).json({ error: "All fields are required except address_line2" });
        }

        const orderData = await client.query(
            'INSERT INTO orders (order_id, user_id, total_amount, address_line1, address_line2, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [order_id, user_id, total_amount, address_line1, address_line2, city, state, postal_code, country]
        );

        const orderInfo = orderData.rows[0];

        if (!orderInfo) {
            return res.status(400).json({ error: "Failed to create order" });
        }

        res.status(200).json({ orderInfo: orderInfo });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.orderitemsRoute = async (req, res) => {
    try {
        const { order_id, product_id, quantity, price } = req.body;

        if (!order_id || !product_id || !quantity || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const orderItemData = await client.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [order_id, product_id, quantity, price]
        );

        const orderItem = orderItemData.rows[0];

        if (!orderItem) {
            return res.status(400).json({ error: "Failed to create order item" });
        }

        res.status(200).json({ orderItem: orderItem });
    } catch (error) {
        console.error('Error creating order item:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.viewOrderItemsRoute = async (req, res) => {
    try {
        const viewOrder = await client.query("SELECT * FROM orders");
        const viewOrderData = viewOrder.rows[0];
        if (!viewOrderData) {
            return res.status(404).json({ error: "No Order Record Found." });
        }

        res.status(200).json({ orderItems: viewOrderData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateOrderItemsRoute = async (req, res) => {
    try {
        const orderID = req.params;
        const { order_status } = req.body;

        const order_id = orderID.order_id;
        // console.log(order_id);

        if (!order_id) {
            return res.status(400).json({ error: "Order ID not found" });
        }

        if (!order_status) {
            return res.status(400).json({ error: "Order Status not found" });
        }

        const orderData = await client.query("UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *", [order_status, order_id]);
        const updatedOrderData = orderData.rows[0];

        if (!updatedOrderData) {
            return res.status(404).json({ error: "Updated Order Data Not Found" });
        }

        res.status(200).json({ orderData: updatedOrderData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.showAllOrders = async (req, res) => {
    try {
        const allOrders = await client.query("SELECT * FROM orders");

        if (allOrders.rows[0]) {
            res.status(400).JSON({ error: "No Books Found" });
        }

        res.status(200).JSON({ books: allOrders })

    } catch (error) {
        console.log(error);
        res.status(500).JSON({ error: "Internal Server Error" });
    }
};

exports.showFullInfoOfOrders = async (req, res) => {
    try {
        const { orderID } = req.params;
        if (!orderID) {
            return res.status(400).JSON({ error: "Please Provide Order ID" });
        };

        const orderInfo = await client.query("SELECT * FROM orders WHERE orderID = $1 RETURNS *", [orderID]);
        if (orderInfo.rows[0]) {
            return res.status(300).JSON({ error: "Order Info Not Found" });
        };
        res.status(200).JSON({ order: orderInfo });
    } catch (error) {
        console.log(error);
        res.status(500).JSON({ error: "Internal Server Error" });
    };
};