const express = require("express");
const routes = express.Router()

routes.get("/", (req, res)=>{
    res.render("homeuser")
})

routes.get("/login", (req, res)=>{
    res.render("login")
})

routes.get("/register", (req, res)=>{
    res.render("register")
    
    
})
routes.post("/register", (req, res)=>{
    try {
        console.log(req.body)
        res.json({message: "Registered Successfully!"})
    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})
module.exports = routes