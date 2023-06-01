const express = require('express');
const route = express.Router()
const adminServices = require('../services/admins/admin')
const userServices = require('../services/users/users')
const movieServices = require('../services/movies/movies')
const bcrypt = require('bcrypt')
const {getAccounts, deleteAccount, updateAccount, createAccount} = adminServices()
const {createaccount, deleteaccount, updateaccount, getAccounts: getaccount} = userServices()
const {selectmovie, updatemovie, deletemovie, addmovie} = movieServices()
//PASSPORT AUTH
const initializePassports = require('../passport-config/adminPassport');
const passport = require('passport');


initializePassports(passport, 
    async (adminname) => {
        const admins = await getAccounts();
        return admins.find(admin => admin.adminname == adminname)},
    async (adminID) => {
        const admins = await getAccounts();
        return admins.find(admin => admin.adminID == adminID)
    } 
    )

    
const checkIfAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/admin/login')
}

const alreadyAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        res.redirect('/admin/bookings')
    }
    return next()
}
route.get('/admin/login', alreadyAuthenticated, (req, res)=>{
    res.render('./admin/login')
})
route.post('/admin/login', passport.authenticate('admin', {
    successRedirect: "/admin/bookings",
    failureRedirect:"/admin/login",
    failureFlash:true
    }), (req, res)=>{
        
        res.json({message: req.message})
    })

route.delete('/admin/logout', (req, res)=>{
    req.logOut(()=>{
        res.redirect('/admin/login')
    })
})
route.get("/admin", checkIfAuthenticated, (req, res)=>{
    res.render("./admin/home")
})
route.get('/admin/admins',  checkIfAuthenticated, async (req, res) => {
    const admin = await getAccounts();
    res.render('./admin/admins', { admin: admin });
  });
  
route.get("/admin/bookings", checkIfAuthenticated, async (req, res)=>{
    const user = await getaccount()
    res.render("./admin/bookings", {user: user})
})
route.get("/admin/movies", checkIfAuthenticated, async (req, res)=>{
    
    const movies = await selectmovie()

    res.render("./admin/movies", {movie: movies})
})
route.get("/admin/users", checkIfAuthenticated, async (req, res)=>{
    const user = await getaccount()
    res.render("./admin/users", {user: user})
})
//ACCOUNTS
route.post("/admin/register",  async (req, res)=>{
    try {
        const {adminName, password} = req.body
        if(adminName == "" || password == ""){  
            res.json({message: "Please fill-up all the fields!"})  
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
        res.json({message: "Registered Successfully!"})
        await createAccount(adminName, hashedPassword)}
           
    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})

route.delete("/admin/delete",  async (req, res)=>{
    try {
        const {adminID} = req.body
        if(adminID == ""){  
            res.json({message: "Please fill-up all the fields!"})  
        }
        else{
        await deleteAccount(adminID)
        res.json({message: "Deleted Successfully!"})
    }

    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})

route.post("/admin/edit",  async (req, res)=>{
    try {
        const {adminID, adminName, password} = req.body
        if(adminName == "" || password == "" || adminID == ""){  
            res.json({message: "Please fill-up all the fields!"})  
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
            await updateAccount(adminID, adminName, hashedPassword)}
            res.json({message: "Updated Successfully!"})
       
    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})

//MOVIES

route.post("/admin/movie/create",  async (req, res)=>{
    try {
        const {movie, poster, genre, duration} = req.body
        if(movie == "" || poster == "" || genre =="" || duration==""){
            res.json({message: "Please Fill-up all the fields!"})

        }
        await addmovie(movie, poster, genre, duration)
        res.json({message: "Added Successfully!"})

    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})

route.delete("/admin/movie/delete",  async (req, res)=>{
    try {
        const {movieID} = req.body
       
        await deletemovie(movieID)
        res.json({message: "Removed Successfully!"})
    

    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})

route.post("/admin/movie/edit",  async (req, res)=>{
    try {
        const {movieID, movie, poster, genre, duration} = req.body
        await updatemovie(movieID, movie, poster, genre, duration)
        res.json({message: "Updated Successfully!"})

    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})
module.exports = route;