const mysql = require('mysql2/promise');
let pool;

module.exports = async (req, res) => {
  // Expect your MySQL connection URI as an environment variable, e.g., "mysql://user:password@host/database"
  const connectionString = process.env.MYSQL_URI;
  if (!connectionString) {
    res.status(500).json({ error: 'Database connection URI not configured.' });
    return;
  }
  
  // Create a connection pool if it doesn't exist
  if (!pool) {
    try {
      pool = mysql.createPool(connectionString);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create database pool.' });
      return;
    }
  }
  
  try {
    // Query the questions table; adjust the table name or query as necessary
    const [rows] = await pool.query('SELECT * FROM questions');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load questions.' });
  }
};