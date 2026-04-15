const express = require('express');
const router = express.Router();
const pool = require('../db');
const redis = require('../redis');

router.get('/', async (req, res) => {
  try {
    const cached = await redis.get('inventory:all');
    if (cached) return res.json(JSON.parse(cached));
    const result = await pool.query('SELECT * FROM inventory ORDER BY created_at DESC');
    await redis.set('inventory:all', JSON.stringify(result.rows), 'EX', 60);
    res.json(result.rows);
  } catch (err) {
    res.json([]);
  }
});

router.post('/', async (req, res) => {
  const { name, category, stock_level, min_stock, max_stock, unit_price, supplier_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO inventory (name, category, stock_level, min_stock, max_stock, unit_price, supplier_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [name, category, stock_level, min_stock, max_stock, unit_price, supplier_id]
    );
    await redis.del('inventory:all');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { stock_level } = req.body;
  try {
    const result = await pool.query(
      'UPDATE inventory SET stock_level=$1 WHERE id=$2 RETURNING *',
      [stock_level, req.params.id]
    );
    await redis.del('inventory:all');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM inventory WHERE id=$1', [req.params.id]);
    await redis.del('inventory:all');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/summary', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory');
    const items = result.rows;
    res.json({
      total_items: items.length,
      low_stock: items.filter(i => i.stock_level <= i.min_stock).length,
      total_value: items.reduce((sum, i) => sum + (i.stock_level * i.unit_price), 0).toFixed(2),
      categories: [...new Set(items.map(i => i.category))].length
    });
  } catch (err) {
    res.json({ total_items: 0, low_stock: 0, total_value: 0, categories: 0 });
  }
});

module.exports = router;
