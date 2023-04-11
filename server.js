
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")
const PORT = process.env.PORT || 1000;
const app = express()

app.use(express.json())
app.use(bodyParser.json())
//ROUTES
const homeroute = require("./backend/routes/homeroute")
// For static files
app.use('/static', express.static(path.join(__dirname, "./frontend/static")))
// For view engine
app.set("views", path.join(__dirname, "./frontend/views"))
app.set("view engine", "ejs")


app.listen(PORT, ()=>{
    console.log(`Server Started at port ${PORT}`)
    console.log()

})

app.use("/", homeroute)
