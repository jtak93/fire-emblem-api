module.exports = {
  server: {
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [
      'http://localhost:3000'
    ]
  },
  mongo: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/fireemblem'
  },
  // redis: {
  //   url: process.env.REDIS_URL
  // },
}
