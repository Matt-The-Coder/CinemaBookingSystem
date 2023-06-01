const express = require("express");
const routes = express.Router()
const passport = require("passport")
const bcrypt = require('bcrypt')
require('dotenv').config()
//services
const movieServices = require('../services/movies/movies')
const accservices = require("../services/users/users");
const book = require('../services/bookings/booking')
const {selectmovie, updatemovie, deletemovie, addmovie} = movieServices();
const {createaccount, deleteaccount, updateaccount, getAccounts, cinema }= accservices();
const  {booking}= book();

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
        return next();
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
routes.get("/home", checkIfAuthenticated, async (req, res)=>{
    const movies = await selectmovie()
    const books = await booking()
   
    res.render("./user/homeuser", ({user: req.user, movie:movies, cinema:books}))
})
//USER PROFILE
routes.get('/profile', checkIfAuthenticated, (req, res)=>{
    const users = req.user
    res.render('./user/profile', {user: users})
})
routes.post("/user/edit", checkIfAuthenticated, async (req, res)=>{
    try {
        const {CustomerID,CustomerName, password} = req.body
        if(CustomerName == "" || password == ""){  
            res.json({message: "Please fill-up all the fields!"})  
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
            await updateaccount(CustomerID, CustomerName, hashedPassword)}
            
            res.json({message: "Updated Successfully!"})
       
    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})
routes.get("/profile/bookings", checkIfAuthenticated, (req, res)=>{
    const users = req.user
 
    res.render("./user/bookings", {user: users})
})

// routes.get("/profile/favorites", checkIfAuthenticated,(req, res)=>{
//     const users = req.user
 
//     res.render("./user/favorites", {user: users})
// })


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
routes.get("/", alreadyAuthenticated, async (req, res)=>{
    const movies = await selectmovie()
    res.render("home", ({movie:movies}))
    
} )

routes.post("/book", async (req, res)=>{
   
    const {CustomerID, CustomerName, password, seat, time, date, movie}= req.body
   
    await cinema(CustomerID, CustomerName, password, seat, time, date, movie)
    
    res.json({message: "Booked Successfully!"});

})

module.exports = routes