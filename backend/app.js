require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()

mongoose.connect(process.env.DB_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB CONNECTED"))

const port = process.env.PORT || 8000

app.listen(port, ()=>console.log(`server running at port ${port}`))