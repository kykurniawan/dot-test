const express = require("express")
const router = express.Router()
const productController = require("../controllers/product")

module.exports = (prismaClient) => {

    const product = productController(prismaClient)

    router.get("/", product.index)

    router.get("/:id", product.show)

    router.post("/", product.store)

    router.put("/:id", product.update)

    router.delete("/:id", product.destroy)

    router.patch("/:id/activate", product.activate)

    router.patch("/:id/deactivate", product.deactivate)

    return router
}