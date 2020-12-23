const express = require('express')
const connectDB = require('./DB/connection')
const cors = require('cors')
const app = express()
const path = require("path")
const routes = require('./Routes/stockRoutes')
require("dotenv").config()


connectDB()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use('/api', routes)
app.use(express.static(path.join(__dirname, "ReactClient", "build")))


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ReactClient", "build", "index.html"));
});

app.listen(PORT, () => console.log('Server listening on Port: ' + PORT))
