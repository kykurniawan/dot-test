const { ValidationError, NotFoundError } = require("../error/errors")
const { createProductSchema, updateProductSchema } = require("../validations/product")

module.exports = (prismaClient) => {
    const index = async (req, res, next) => {
        try {
            const products = await prismaClient.product.findMany({
                include: {
                    category: true
                }
            })

            const data = {
                status: 200,
                message: "Ok",
                data: {
                    products: products
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
            const product = await prismaClient.product.findUnique({
                where: {
                    id: id
                },
                include: {
                    category: true
                }
            })

            if (product === null) {
                return next(new NotFoundError("Product Not Found"))
            }

            const data = {
                status: 200,
                message: "Ok",
                data: {
                    product: product
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
            const { error, value } = createProductSchema.validate(req.body)

            if (error) {
                return next(new ValidationError({ _original: error._original, detail: error.details[0].message }))
            }

            const findCategory = await prismaClient.category.findUnique({ where: { id: value.categoryId } })

            if (findCategory === null) {
                return next(new ValidationError({ _original: value, detail: "\"categoryId\" is invalid" }))
            }

            const product = await prismaClient.product.create({
                data: value,
            })

            res.status(201).json({
                status: 201,
                message: "Product Created",
                data: {
                    product: product
                }
            })
        } catch (error) {
            next(error)
        }
    }

    const update = async (req, res, next) => {
        try {
            const { id } = req.params
            console.log(id)
            const findProduct = await prismaClient.product.findUnique({
                where: {
                    id: id
                },
            })

            if (findProduct === null) {
                return next(new NotFoundError("Product Not Found"))
            }

            const { error, value } = updateProductSchema.validate(req.body)

            if (error) {
                return next(new ValidationError({ _original: error._original, detail: error.details[0].message }))
            }

            if (value.categoryId) {
                const findCategory = await prismaClient.category.findUnique({ where: { id: value.categoryId } })

                if (findCategory === null) {
                    return next(new ValidationError({ _original: value, detail: "\"categoryId\" is invalid" }))
                }
            }

            const product = await prismaClient.product.update({
                where: {
                    id: id
                },
                data: value
            })

            res.json({
                status: 200,
                message: "Product Updated",
                data: {
                    product: product
                }
            })
        } catch (error) {
            next(error)
        }
    }

    const destroy = async (req, res, next) => {
        try {
            const { id } = req.params
            const findProduct = await prismaClient.product.findUnique({
                where: {
                    id: id
                },
            })

            if (findProduct === null) {
                return next(new NotFoundError("Product Not Found"))
            }

            await prismaClient.product.delete({
                where: {
                    id: id
                }
            })
            res.json({
                status: 200,
                message: "Product Deleted",
                data: null
            })
        } catch (error) {
            next(error)
        }
    }

    const activate = async (req, res, next) => {
        try {
            const { id } = req.params
            const findProduct = await prismaClient.product.findUnique({
                where: {
                    id: id
                },
            })

            if (findProduct === null) {
                return next(new NotFoundError("Product Not Found"))
            }

            const product = await prismaClient.product.update({
                where: {
                    id: id
                },
                data: {
                    active: true,
                }
            })

            res.json({
                status: 200,
                message: "Product Activated",
                data: {
                    product: product
                }
            })
        } catch (error) {
            next(error)
        }
    }

    const deactivate = async (req, res, next) => {
        try {
            const { id } = req.params
            const findProduct = await prismaClient.product.findUnique({
                where: {
                    id: id
                },
            })

            if (findProduct === null) {
                return next(new NotFoundError("Product Not Found"))
            }

            const product = await prismaClient.product.update({
                where: {
                    id: id
                },
                data: {
                    active: false,
                }
            })

            res.json({
                status: 200,
                message: "Product Deactivated",
                data: {
                    product: product
                }
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
        activate,
        deactivate
    }
}