require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const product = require("./routes/product")
const category = require("./routes/category")
const errorHandler = require("./error/handler")
const { NotFoundError } = require("./error/errors")
const cache = require("./middlewares/cache")

module.exports = (redisClient, prismaClient) => {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(morgan("dev"))

    app.use("/products", cache(redisClient), product(prismaClient))
    app.use("/categories", cache(redisClient), category(prismaClient))

    app.use((req, res, next) => {
        next(new NotFoundError("API Endpoint Not Found"))
    })

    app.use(errorHandler)

    return app
}
