const express = require("express")
const categoryController = require("../controllers/category")
const router = express.Router()

module.exports = (prismaClient) => {

    const category = categoryController(prismaClient)

    router.get("/", category.index)

    router.get("/:id", category.show)

    router.post("/", category.store)

    router.put("/:id", category.update)

    router.delete("/:id", category.destroy)

    return router
}
