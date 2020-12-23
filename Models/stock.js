const mongoose = require('mongoose')

const stock = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    daily_hilo: {
        type: Object,
    },
    currentValue: {
        type: Number
    },
    One_Month_Hilo: {
        type: Object
    },
    One_Month_Consolidation: {
        type: Number
    },
    Three_Month_Hilo: {
        type: Object
    },
    Three_Month_Consolidation: {
        type: Number
    },
    Six_Month_Hilo: {
        type: Object
    },
    Six_Month_Consolidation: {
        type: Number
    },
    Type: {
        type: String
    }
})
module.exports = stock