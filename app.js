const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require('./controller/auth');

require("colors");
require("dotenv").config({ path: "./config/config.env" });

const port = process.env.PORT || 9000;

// PostgreSQL connection 
require("./database/PostgreSQL");
// log request middleware 
const logRequest = require("./middleware/logRequest");

// import routes
const userRoute = require("./routes/users");
const adminRoute = require("./routes/admin");
const bookRoute = require("./routes/books");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/orders");

// use middleware 
app.use(bodyparser.json());
app.use(cors());
app.use(logRequest);
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get("/", (req, res) => {
    res.send("Online Book Store");
});

// routs 
app.use("/user", userRoute);
// app.use("/admin", adminRoute);
// app.use("/book", bookRoute);
// app.use("/cart", cartRoute);
// app.use("/order", orderRoute);

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`.bgGreen.blue);
});