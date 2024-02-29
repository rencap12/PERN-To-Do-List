const {Pool} = require("pg");

// PostgreSQL connection string with provided URL
const connectionString = 'postgres://yqvmiwgv:4s3QU55kgHCnGr4AJALZbKVFUQHN42JZ@ruby.db.elephantsql.com/yqvmiwgv';

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // For ElephantSQL, set to false to bypass SSL validation
  }
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database at:', res.rows[0].now);
    }
  });

  module.exports = pool; 