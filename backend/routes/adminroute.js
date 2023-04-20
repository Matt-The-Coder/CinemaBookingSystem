const express = require('express');
const route = express.Router()

route.get("/admin", (req, res)=>{
    res.render("admin")
})
route.get("/admin/bookings", (req, res)=>{
    res.render("bookings")
})
route.get("/admin/movies", (req, res)=>{
    res.render("movies")
})
route.get("/admin/users", (req, res)=>{
    res.render("users")
})

module.exports = route;