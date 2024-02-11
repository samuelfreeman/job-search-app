const Redis = require('ioredis');
const redis = new Redis(
  'rediss://red-cn41k0f109ks73eshuig:Ih2Q9f0B5xJl5H6zRZ4k486V0BiPupVs@oregon-redis.render.com:6379',
);

redis.on('error', (err) => {
  console.log;
  'could not  establish a connection with Redis' + err;
});

redis.on('connect', (err) => {
  console.log("connected to redis succesfully");
});
module.exports = redis;
