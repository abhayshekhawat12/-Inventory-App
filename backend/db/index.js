const { newDb } = require('pg-mem');

const db = newDb();

db.public.none(`
  CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    stock_level INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 10,
    max_stock INTEGER DEFAULT 100,
    unit_price DECIMAL,
    supplier_id INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    message TEXT,
    item_id INTEGER,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
  );


`);

console.log('Database tables ready (In-Memory) ✅');

const { Pool } = db.adapters.createPg();
const pool = new Pool();

module.exports = pool;