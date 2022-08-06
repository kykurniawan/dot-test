const { ValidationError, NotFoundError } = require("./errors")

const handler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(err.status)
        return res.json({
            status: err.status,
            message: "Validation Error",
            error: err.validationError
        })
    }

    if (err instanceof NotFoundError) {
        res.status(err.status)
        return res.json({
            status: err.status,
            message: err.message,
        })
    }

    console.error(err)

    res.status(500)
    res.json({
        status: 500,
        message: "Internal Server Error"
    })
}

module.exports = handler