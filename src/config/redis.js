const Redis = require('ioredis');
require('dotenv').config();

const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
})

redis.on('connect', () => {
    console.log('Connected to Redis Successfully');
})

redis.on('error', () => {
    console.log('Failed Connection error', err);
})

module.exports = redis;