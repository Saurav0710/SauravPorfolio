const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'saurav_portfolio',
    port: Number(process.env.DB_PORT) || 5432,
    max: 10,
});

module.exports = pool;