const supertest = require("supertest")
const app = require("../app")
const redis = require("../utils/redis")
const prisma = require("../utils/prisma")
const product = require("../controllers/product")

describe("api endpoint test", () => {

    let redisClient
    let appInstance

    beforeAll(async () => {
        redisClient = redis
        await redisClient.connect()
        await prisma.connect()

        appInstance = app(redisClient, prisma.prismaClient)
    })

    afterAll(async () => {
        await redisClient.disconnect()
        await prisma.prismaClient.product.deleteMany({})
        await prisma.prismaClient.category.deleteMany({})
        await prisma.disconect()
    })

    describe("test category api endpoint", () => {
        describe("get categories", () => {
            test("should return 200 status code", async () => {
                const response = await supertest(appInstance).get("/categories")
                expect(response.statusCode).toBe(200)
            })
        })

        describe("get category by id", () => {
            test("should return 200 status code and same category object", async () => {
                const category = await prisma.prismaClient.category.create({
                    data: {
                        name: "Test",
                    }
                })
                const response = await supertest(appInstance).get("/categories/" + category.id)
                expect(response.statusCode).toBe(200)
                expect(response.body.data.category.name).toEqual("Test")
            })
        })

        describe("get category with invalid id", () => {
            test("should return 404 status code", async () => {
                const invalidId = "3913952b-7eea-4bc4-b219-848a038ae533"
                const response = await supertest(appInstance).get("/categories/" + invalidId)
                expect(response.statusCode).toBe(404)
            })
        })

        describe("create new category with valid data", () => {
            test("should return 201 status code and same category name", async () => {
                const response = await supertest(appInstance).post("/categories/").send({
                    name: "New Category"
                })
                expect(response.statusCode).toBe(201)
                expect(response.body.data.category.name).toEqual("New Category")
            })
        })

        describe("create new category with invalid data", () => {
            test("should return 400 status code", async () => {
                const response = await supertest(appInstance).post("/categories/").send({
                    name: ""
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe("update category item with valid data", () => {
            test("should return 200 status code and category updated", async () => {
                const newCategory = await prisma.prismaClient.category.create({
                    data: {
                        name: "Hello"
                    }
                })
                const response = await supertest(appInstance).put("/categories/" + newCategory.id).send({
                    name: "New Hello",
                })
                expect(response.statusCode).toBe(200)
                expect(response.body.data.category.name).toEqual("New Hello")
            })
        })

        describe("update category item with invalid data", () => {
            test("should return 400 status code", async () => {
                const newCategory = await prisma.prismaClient.category.create({
                    data: {
                        name: "Hello"
                    }
                })
                const response = await supertest(appInstance).put("/categories/" + newCategory.id)
                expect(response.statusCode).toBe(400)
            })
        })

        describe("delete category by id", () => {
            test("should return 200 status code", async () => {
                const newCategory = await prisma.prismaClient.category.create({
                    data: {
                        name: "Hello"
                    }
                })
                const response = await supertest(appInstance).delete("/categories/" + newCategory.id)
                expect(response.statusCode).toBe(200)
            })
        })

        describe("delete category with invalid id", () => {
            test("should return 404 status code", async () => {
                const invalidId = "3913952b-7eea-4bc4-b219-848a038ae533"
                const response = await supertest(appInstance).delete("/categories/" + invalidId)
                expect(response.statusCode).toBe(404)
            })
        })
    })

    describe("test product api endpoint", () => {
        describe("get products", () => {
            test("should return 200 status code", async () => {
                const response = await supertest(appInstance).get("/products")
                expect(response.statusCode).toBe(200)
            })
        })

        describe("get product by id", () => {
            test("should return 200 status code and same product object", async () => {
                const category = await prisma.prismaClient.category.create({
                    data: {
                        name: "Test",
                    }
                })
                const product = await prisma.prismaClient.product.create({
                    data: {
                        name: "Product",
                        price: 40000,
                        categoryId: category.id
                    }
                })
                const response = await supertest(appInstance).get("/products/" + product.id)
                expect(response.statusCode).toBe(200)
                expect(response.body.data.product.name).toEqual("Product")
                expect(response.body.data.product.price).toEqual(40000)
                expect(response.body.data.product.categoryId).toEqual(category.id)
            })
        })

        describe("get product with invalid id", () => {
            test("should return 404 status code", async () => {
                const invalidId = "3913952b-7eea-4bc4-b219-848a038ae533"
                const response = await supertest(appInstance).get("/products/" + invalidId)
                expect(response.statusCode).toBe(404)
            })
        })

        describe("create new product with valid data", () => {
            test("should return 201 status code and same product name", async () => {
                const category = await prisma.prismaClient.category.create({
                    data: {
                        name: "Test",
                    }
                })
                const response = await supertest(appInstance).post("/products/").send({
                    name: "Product",
                    price: 40000,
                    categoryId: category.id
                })
                expect(response.statusCode).toBe(201)
                expect(response.body.data.product.name).toEqual("Product")
            })
        })

        describe("create new product with invalid data", () => {
            test("should return 400 status code", async () => {
                const response = await supertest(appInstance).post("/products/").send({
                    name: ""
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe("update product item with valid data", () => {
            test("should return 200 status code and product updated", async () => {
                const category = await prisma.prismaClient.category.create({
                    data: {
                        name: "Test",
                    }
                })
                const product = await prisma.prismaClient.product.create({
                    data: {
                        name: "Product",
                        price: 40000,
                        categoryId: category.id
                    }
                })
                const response = await supertest(appInstance).put("/products/" + product.id).send({
                    name: "New Product",
                })
                expect(response.statusCode).toBe(200)
                expect(response.body.data.product.name).toEqual("New Product")
            })
        })

        describe("update product item with invalid data", () => {
            test("should return 400 status code", async () => {
                const category = await prisma.prismaClient.category.create({
                    data: {
                        name: "Test",
                    }
                })
                const product = await prisma.prismaClient.product.create({
                    data: {
                        name: "Product",
                        price: 40000,
                        categoryId: category.id
                    }
                })
                const response = await supertest(appInstance).put("/products/" + product.id).send({
                    categoryId: "3913952b-7eea-4bc4-b219-848a038ae533" // invalid category id
                })
                expect(response.statusCode).toBe(400)
            })
        })

        describe("delete product by id", () => {
            test("should return 200 status code", async () => {
                const category = await prisma.prismaClient.category.create({
                    data: {
                        name: "Test",
                    }
                })
                const product = await prisma.prismaClient.product.create({
                    data: {
                        name: "Product",
                        price: 40000,
                        categoryId: category.id
                    }
                })

                const response = await supertest(appInstance).delete("/products/" + product.id)
                expect(response.statusCode).toBe(200)
            })
        })

        describe("delete product with invalid id", () => {
            test("should return 404 status code", async () => {
                const invalidId = "3913952b-7eea-4bc4-b219-848a038ae533"
                const response = await supertest(appInstance).delete("/products/" + invalidId)
                expect(response.statusCode).toBe(404)
            })
        })

        describe("activate product", () => {
            test("should return 200 status code", async () => {
                const category = await prisma.prismaClient.category.create({
                    data: {
                        name: "Test",
                    }
                })
                const product = await prisma.prismaClient.product.create({
                    data: {
                        name: "Product",
                        price: 40000,
                        categoryId: category.id
                    }
                })

                const response = await supertest(appInstance).patch("/products/" + product.id + "/activate")
                expect(response.statusCode).toBe(200)
            })
        })

        describe("activate product with invalid id", () => {
            test("should return 404 status code", async () => {
                const invalidId = "3913952b-7eea-4bc4-b219-848a038ae533"
                const response = await supertest(appInstance).patch("/products/" + invalidId + "/activate")
                expect(response.statusCode).toBe(404)
            })
        })

        describe("deactivate product", () => {
            test("should return 200 status code", async () => {
                const category = await prisma.prismaClient.category.create({
                    data: {
                        name: "Test",
                    }
                })
                const product = await prisma.prismaClient.product.create({
                    data: {
                        name: "Product",
                        price: 40000,
                        categoryId: category.id
                    }
                })

                const response = await supertest(appInstance).patch("/products/" + product.id + "/deactivate")
                expect(response.statusCode).toBe(200)
            })
        })

        describe("deactivate product with invalid id", () => {
            test("should return 404 status code", async () => {
                const invalidId = "3913952b-7eea-4bc4-b219-848a038ae533"
                const response = await supertest(appInstance).patch("/products/" + invalidId + "/deactivate")
                expect(response.statusCode).toBe(404)
            })
        })
    })
})  