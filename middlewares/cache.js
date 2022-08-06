const cache = (redisClient) => {
    return async (req, res, next) => {
        const key = req.originalUrl
        req.redisClient = redisClient
        if (req.method === "GET") {
            try {
                const cached = await redisClient.get(key)
                if (cached) {
                    return res.status(200).json(JSON.parse(cached))
                }
                return next()
            } catch (error) {
                return next()
            }
        }
        await redisClient.del(key)
        return next()
    }
}

module.exports = cache