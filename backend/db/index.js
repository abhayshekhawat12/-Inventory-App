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

  INSERT INTO suppliers (name, email, phone, address, rating) VALUES 
  ('TechCorp Electronics', 'sales@techcorp.com', '555-0100', '123 Silicon Valley', 5),
  ('Global Logistics', 'contact@globallogistics.com', '555-0200', '456 Freight St', 4);

  INSERT INTO inventory (name, category, stock_level, min_stock, max_stock, unit_price, supplier_id) VALUES 
  ('Wireless Mouse', 'Electronics', 150, 20, 300, 25.99, 1),
  ('Mechanical Keyboard', 'Electronics', 5, 15, 100, 89.99, 1),
  ('Shipping Boxes (L)', 'Packaging', 500, 100, 2000, 1.50, 2);
`);

console.log('Database tables ready (In-Memory) ✅');

const { Pool } = db.adapters.createPg();
const pool = new Pool();

module.exports = pool;