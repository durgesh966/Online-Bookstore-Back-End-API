const { Client } = require('pg');
require("dotenv").config({ path: "./config/config.env" }); 

const client = new Client({
    user: process.env.PG_USERNAME,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE_NAME,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
// console.log(process.env.PG_USERNAME, process.env.PG_HOST, process.env.PG_DATABASE_NAME, process.env.PG_PASSWORD, process.env.PG_PORT);
client.connect(function (err) {
    if (err) {
        console.log(`error during connecting to postgresql, ${err}`.bgRed.black);
    } else {
        console.log("Connected! To PostgreSQL".bgYellow.blue);
    }
});

module.exports = client;