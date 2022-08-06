const { ValidationError, NotFoundError } = require("../error/errors")
const { createCategorySchema, updateCategorySchema } = require("../validations/category")

module.exports = (prismaClient) => {
    const index = async (req, res, next) => {
        try {
            const categories = await prismaClient.category.findMany({
                include: {
                    products: true
                }
            })

            const data = {
                status: 200,
                message: "Ok",
                data: {
                    categories: categories
                }
            }

            await req.redisClient.set(req.originalUrl, JSON.stringify(data), {
                EX: 60,
                NX: true
            })

            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    const show = async (req, res, next) => {
        try {
            const { id } = req.params
            const category = await prismaClient.category.findUnique({
                where: {
                    id: id
                },
                include: {
                    products: true
                }
            })

            if (category === null) {
                return next(new NotFoundError("Category Not Found"))
            }

            const data = {
                status: 200,
                message: "Ok",
                data: {
                    category: category
                }
            }

            await req.redisClient.set(req.originalUrl, JSON.stringify(data), {
                EX: 60,
                NX: true
            })

            res.json(data)

        } catch (error) {
            next(error)
        }
    }

    const store = async (req, res, next) => {
        try {
            const { error, value } = createCategorySchema.validate(req.body)

            if (error) {
                return next(new ValidationError({ _original: error._original, detail: error.details[0].message }))
            }

            const category = await prismaClient.category.create({
                data: value,
            })

            res.status(201).json({
                status: 201,
                message: "Category Created",
                data: {
                    category: category
                }
            })
        } catch (error) {
            next(error)
        }
    }

    const update = async (req, res, next) => {
        try {
            const { id } = req.params
            const findCategory = await prismaClient.category.findUnique({
                where: {
                    id: id
                },
            })

            if (findCategory === null) {
                return next(new NotFoundError("Category Not Found"))
            }

            const { error, value } = updateCategorySchema.validate(req.body)

            if (error) {
                return next(new ValidationError({ _original: error._original, detail: error.details[0].message }))
            }

            const category = await prismaClient.category.update({
                where: {
                    id: id
                },
                data: value
            })

            res.json({
                status: 200,
                message: "Category Updated",
                data: {
                    category: category
                }
            })
        } catch (error) {
            next(error)
        }
    }

    const destroy = async (req, res, next) => {
        try {
            const { id } = req.params
            const findCategory = await prismaClient.category.findUnique({
                where: {
                    id: id
                },
            })

            if (findCategory === null) {
                return next(new NotFoundError("Category Not Found"))
            }

            await prismaClient.category.delete({
                where: {
                    id: id
                }
            })
            res.json({
                status: 200,
                message: "Category Deleted",
                data: null
            })
        } catch (error) {
            next(error)
        }
    }

    return {
        index,
        show,
        store,
        update,
        destroy,
    }
}