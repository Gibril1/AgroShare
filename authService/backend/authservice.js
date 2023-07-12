const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const { errorHandler } = require('../../middleware/ErrorMiddleware')
const port = process.env.PORT || 5000

// Connect DB
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Auth Service Database Connected`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
connectDB()

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(errorHandler)

// Routes
app.use('/api/v1/auth/', require('./AuthRoutes'))


// Listen to the port
app.listen(port, () => {
    console.log(`Auth Service is running at http://localhost:${port}`)
})