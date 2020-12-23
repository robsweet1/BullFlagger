const express = require('express')
const router = express.Router()
const stock = require('../Models/stock')
const mongoose = require('mongoose')

const modelNYSE   = mongoose.model('stock', stock, 'NYSE')
const modelSP500  = mongoose.model('stock', stock, 'SP500') 
const modelNASDAQ = mongoose.model('stock', stock, 'NASDAQ')

router.get('/getdata', (req, res) => {
    var StockSchema

    if(req.query.stockListing === 'NYSE'){StockSchema = modelNYSE}
    else if(req.query.stockListing === 'SP500'){StockSchema = modelSP500}
    else if(req.query.stockListing === 'NASDAQ'){StockSchema = modelNASDAQ}

    if(req.query.timePeriod === 'One_Month_Consolidation'){
        StockSchema.find({One_Month_Consolidation :{ $lte: req.query.percentage}, Type: 'Company', currentValue:{ $gte: req.query.minPrice}}, {'_id': 0,'name': 1, 'currentValue': 1, 'One_Month_Consolidation': 1} ,(err, result) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
                console.log(result)
                res.json(result)
                
        })
    }
    else if(req.query.timePeriod === 'Three_Month_Consolidation'){
        StockSchema.find({Three_Month_Consolidation :{ $lte: req.query.percentage}, Type: 'Company', currentValue:{ $gte: req.query.minPrice}}, {'_id': 0,'name': 1, 'currentValue': 1, 'Three_Month_Consolidation': 1} ,(err, result) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
                console.log(result)
                res.json(result)
                
        })
    }
    else{
        StockSchema.find({Six_Month_Consolidation :{ $lte: req.query.percentage}, Type: 'Company' , currentValue:{ $gte: req.query.minPrice}}, {'_id': 0,'name': 1, 'currentValue': 1, 'Six_Month_Consolidation': 1} ,(err, result) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
                console.log(result)
                res.json(result)
                
        })
    }
})

module.exports = router