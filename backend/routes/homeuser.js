const express = require("express");
const routes = express.Router()
const passport = require("passport")
const bcrypt = require('bcrypt')
require('dotenv').config()
//services
const accservices = require("../services/users/users");

const {createaccount, deleteaccount, updateaccount, getAccounts }= accservices();

routes.post("/login", passport.authenticate('user', {
    successRedirect: "/home",
    failureRedirect:"/login",
    failureFlash:true
    }), (req, res)=>{
        res.json({message: req.message})
    })


//PASSPORT AUTH
const initializePassport = require('../passport-config/passport');


initializePassport(passport, 
    async (Username) => {
        const users = await getAccounts();
        return users.find(user => user.CustomerName == Username)},
    async (CustomerID) => {
        const users = await getAccounts();
        return users.find(user => user.CustomerID == CustomerID)
    } 
    )

const checkIfAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

const alreadyAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        res.redirect('/home')
    }
    return next()
}
//LOGIN
routes.get("/login", alreadyAuthenticated, async (req, res)=>{
    res.render("login")
    
//WHEN LOGGED IN
})
routes.get("/home", checkIfAuthenticated, (req, res)=>{
    res.render("./user/homeuser", ({user: req.user}))
})
//USER PROFILE
routes.get('/profile', (req, res)=>{
    res.render('./user/profile')
})
routes.get("/profile/bookings", (req, res)=>{
    res.render("./user/bookings")
})
routes.get("/profile/favorites", (req, res)=>{
    res.render("./user/favorites")
})


//REGISTER
routes.get("/register", alreadyAuthenticated, (req, res)=>{
    res.render("register")
})
routes.post("/register", alreadyAuthenticated,  async (req, res)=>{
    try {
        const {user, pass} = req.body
        if(user == "" || pass == ""){  
            res.json({message: "Please fill-up all the fields!"})  
        }
        else{
            const hashedPassword = await bcrypt.hash(pass, 10)
        res.json({message: "Registered Successfully!"})
        await createaccount(user, hashedPassword)}

    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})

//LOGOUT
routes.delete('/logout', (req, res)=>{
    req.logOut(()=>{
        res.redirect('/login')
    })
   
})


//DEFAULT HOME ROUTE
routes.get("/", alreadyAuthenticated, (req, res)=>{
    res.render("home")
} )



module.exports = routes