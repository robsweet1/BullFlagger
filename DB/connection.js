const mongoose = require('mongoose')
require("dotenv").config()

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || URI, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    })
    console.log('Connection to DB established')
}

module.exports = connectDB