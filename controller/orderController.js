const client = require("../database/PostgreSQL");

exports.addOrderRoute = async (req, res) => {
    try {

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