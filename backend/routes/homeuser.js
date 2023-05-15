const express = require("express");
const routes = express.Router()
const passport = require("passport")
const bcrypt = require('bcrypt')
require('dotenv').config()
//services
const accservices = require("../services/users/users");

const {createaccount, deleteaccount, updateaccount, getAccounts }= accservices();

//PASSPORT AUTH
const initializePassport = require('../passport-config/passport')

initializePassport(passport, 
    async (Username) => {
        const users = await getAccounts();
        users.find(user => user.CustomerName === Username)},
    async (CustomerID) => {
        const users = await getAccounts();
        users.find(user => user.CustomerID == CustomerID)
    } 
    )

const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

const checkNotAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    return next()
}

routes.get("/login", checkNotAuthenticated, (req, res)=>{
    res.render("login")

})
routes.get("/home", checkAuthenticated, (req, res)=>{
    res.render("homeuser")
})

routes.post("/login", passport.authenticate('local', {
successRedirect: "/homeuser",
failureRedirect:"/login",
failureFlash:true
}))

routes.get("/register", checkNotAuthenticated, (req, res)=>{
    res.render("register")
    
    
})
routes.post("/register", checkNotAuthenticated, async (req, res)=>{
    try {
        const {user, pass} = req.body
        // const hashedpassword = await bcrypt.hash(pass, 10)
        res.json({message: "Registered Successfully!"})
        await createaccount(user, pass)
            
    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})

routes.get("/", checkNotAuthenticated, (req, res)=>{
    res.render("home")
} )



module.exports = routes