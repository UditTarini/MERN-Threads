require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const auth_route = require("./routes/auth")
const user_route = require("./routes/user")

// connection
mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB CONNECTED"))


// middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// route
app.use("/api", auth_route)
app.use("/api", user_route)

// port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`server running at port ${port}`))