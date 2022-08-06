require("dotenv").config()
const process = require("process")
const redis = require("redis")

module.exports = redis.createClient({
    url: process.env.REDIS_URL
})