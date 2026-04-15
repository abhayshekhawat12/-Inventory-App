const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/stock', async (req, res) => {
  try {
    const result = await pool.query('SELECT category, SUM(stock_level) as total_stock, SUM(stock_level * unit_price) as total_value FROM inventory GROUP BY category');
    res.json(result.rows);
  } catch (err) {
    res.json([]);
  }
});

router.get('/demand', async (req, res) => {
  try {
    const result = await pool.query('SELECT name, stock_level, min_stock, max_stock FROM inventory ORDER BY stock_level ASC LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    res.json([]);
  }
});

module.exports = router;
