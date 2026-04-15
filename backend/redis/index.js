const Redis = require('ioredis-mock');
require('dotenv').config();

const redis = new Redis();

redis.on('connect', () => console.log('Redis (Mock) connected ✅'));
redis.on('error', (err) => console.log('Redis error:', err.message));

module.exports = redis;
