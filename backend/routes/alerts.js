const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alerts ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch (err) {
    res.json([]);
  }
});

router.put('/:id/read', async (req, res) => {
  try {
    await pool.query('UPDATE alerts SET is_read=TRUE WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/clear', async (req, res) => {
  try {
    await pool.query('DELETE FROM alerts WHERE is_read=TRUE');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;