class ValidationError extends Error {
    constructor(validationError) {
        super()
        this.name = this.constructor.name
        this.message = "Validation Error"
        this.validationError = validationError
        this.status = 400
    }
}

class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super()
        this.name = this.constructor.name
        this.message = message
        this.status = 404
    }
}

module.exports = {
    ValidationError,
    NotFoundError,
}