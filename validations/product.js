const Joi = require("joi")

const createProductSchema = Joi.object({
    name: Joi.string().min(1).max(128).required(),
    price: Joi.number().min(0).max(999999999).required(),
    active: Joi.boolean(),
    categoryId: Joi.string().uuid().required()
})

const updateProductSchema = Joi.object({
    name: Joi.string().min(1).max(128),
    price: Joi.number().min(0).max(999999999),
    active: Joi.boolean(),
    categoryId: Joi.string().uuid()
})

module.exports = {
    createProductSchema,
    updateProductSchema
}