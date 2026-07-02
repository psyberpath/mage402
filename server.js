require('dotenv').config();
const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const port = process.env.PORT || 3000;

// Initialize SQLite Database
const db = new Database('mage402.db');

// Create tenants table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API endpoint to get tenants
app.get('/api/tenants', (req, res) => {
  // Currently returning an empty array as a stub
  res.json([]);
});

// Start the server
app.listen(port, () => {
  console.log(`Mage402 server listening at http://localhost:${port}`);
});
