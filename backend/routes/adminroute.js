const express = require('express');
const route = express.Router()

route.get("/admin", (req, res)=>{
    res.render("./admin/home")
})
route.get("/admin/bookings", (req, res)=>{
    res.render("./admin/bookings")
})
route.get("/admin/movies", (req, res)=>{
    res.render("./admin/movies")
})
route.get("/admin/users", (req, res)=>{
    res.render("./admin/users")
})

module.exports = route;