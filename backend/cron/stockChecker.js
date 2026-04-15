const cron = require('node-cron');
const pool = require('../db');
const redis = require('../redis');

cron.schedule('*/30 * * * *', async () => {
  try {
    const result = await pool.query('SELECT * FROM inventory WHERE stock_level <= min_stock');
    const lowStockItems = result.rows;

    for (const item of lowStockItems) {
      const alertKey = `alert:low_stock:${item.id}`;
      const exists = await redis.get(alertKey);
      if (!exists) {
        await pool.query(
          'INSERT INTO alerts (type, message, item_id) VALUES ($1, $2, $3)',
          ['LOW_STOCK', `Low stock alert: ${item.name} has only ${item.stock_level} units left!`, item.id]
        );
        await redis.set(alertKey, '1', 'EX', 3600);
        console.log(`Alert created for ${item.name}`);
      }
    }
  } catch (err) {
    console.log('Cron error:', err.message);
  }
});