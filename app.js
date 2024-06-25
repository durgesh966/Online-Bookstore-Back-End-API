const express = require("express");
const bodyparser = require("body-parser");

require("colors");
require("dotenv").config({ path: "./config/config.env" });

const port = process.env.PORT || 9000;

// PostgreSQL connection 
const PostgreSQL = require("./database/PostgreSQL");

const app = express();

// use middleware 
app.use(bodyparser.json());


app.get("/", (req, res) => {
    res.send("Online Book Store");
});

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`.bgGreen.blue);
});