const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


module.exports = mongoose.model('Product', ProductSchema)