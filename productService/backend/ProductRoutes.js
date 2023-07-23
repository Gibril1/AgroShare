const productRouter = require('express').Router()

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('./ProductControllers')

const { protect } = require('./ProductUtils')

productRouter.route('/')
    .post(protect, createProduct)
    .get(protect, getProducts)

productRouter.route('/:id')
    .get(protect, getProduct)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct)


module.exports = productRouter