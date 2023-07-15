const supplyRouter = require('express').Router()

const { protect } = require('../../middleware/AuthMiddleware')

const { createSupplyRequest } = require('./SupplyControllers')

supplyRouter.post('/create', protect, createSupplyRequest)

module.exports = supplyRouter