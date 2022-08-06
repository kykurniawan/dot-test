const Joi = require("joi")

const createCategorySchema = Joi.object({
    name: Joi.string().min(1).max(128).required(),
})

const updateCategorySchema = Joi.object({
    name: Joi.string().min(1).max(128).required(),
})

module.exports = {
    createCategorySchema,
    updateCategorySchema
}