require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport');
const PORT = process.env.PORT;
const app = express()

//PASSPORT AND SESSION
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use( session({
  secret: process.env.SESSION_SECRET1,
  resave: false,
  saveUninitialized: false
}))
app.use( passport.initialize())
app.use( passport.session())


app.use('/admin', session({
  secret: process.env.SESSION_SECRET2,
  resave: false,
  saveUninitialized: false
}))
app.use('/admin', passport.initialize())
app.use('/admin', passport.session())
app.use(methodOverride('_method'))




//middleWare
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: "false"}))


//ROUTES
const homeuser = require("./backend/routes/homeuser")
const adminroute = require("./backend/routes/adminroute")


// For static files
app.use('/static', express.static(path.join(__dirname, "./frontend/static")))



// For view engine
app.set("views", path.join(__dirname, "./frontend/views"))
app.set("view engine", "ejs")


//DATABASE
const db = require("./backend/database/connection");


//FOR SERVER
app.listen(PORT, async ()=>{
    console.log(`Server Started at port ${PORT}`)

    

})
app.use("/", homeuser)
app.use("/", adminroute)
