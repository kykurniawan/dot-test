require("dotenv").config()

const process = require("process")
const app = require("./app");
const redis = require("./utils/redis")
const { prismaClient } = require("./utils/prisma")

let redisClient

(async () => {
    redisClient = redis
    redisClient.on("error", (error) => console.error(error))
    await redisClient.connect()
})()

app(redisClient, prismaClient).listen(process.env.PORT, () => {
    console.log("server running on https://127.0.0.1:" + process.env.PORT)
})