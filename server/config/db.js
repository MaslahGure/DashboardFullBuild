const Pool = require('pg').Pool;
require("dotenv").config();


const pool = new Pool ({
    user: process.env.PGUSER,
    host:  process.env.PGHOST,
    database: process.env.PGDATABASE,
    password:  process.env.PASSWORD,
    port:  process.env.PGPORT
});

module.exports = pool;
