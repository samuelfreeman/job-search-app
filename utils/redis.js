const Redis = require('ioredis');
const logger = require('./logger');
const redis = new Redis(
  'rediss://red-cn41k0f109ks73eshuig:Ih2Q9f0B5xJl5H6zRZ4k486V0BiPupVs@oregon-redis.render.com:6379',
);

redis.on('error', (err) => {
  logger.error('could not  establish a connection with Redis' + err);
});

module.exports = redis;
