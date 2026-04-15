const express = require('express');
const cors = require('cors');
require('dotenv').config();

const inventoryRoutes = require('./routes/inventory');
const supplierRoutes = require('./routes/suppliers');
const alertRoutes = require('./routes/alerts');
const reportRoutes = require('./routes/reports');
require('./cron/stockChecker');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Inventory System API running ✅' }));
app.use('/api/inventory', inventoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;