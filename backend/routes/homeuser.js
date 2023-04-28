const express = require("express");
const routes = express.Router()
//services
const accservices = require("../services/users/users")
const {createaccount, deleteaccount, authenticateacc, updateaccount, showaccount }= accservices();

routes.get("/login", async (req, res)=>{
    res.render("login")

})

routes.post("/login", async (req, res)=>{
    
    try {
        const {user, pass} = req.body;
        const auth = await authenticateacc(user, pass);
        
        if(auth.length > 0){
            // res.status(200).json({message: "Successfully Logged in"})   
           res.redirect('http://localhost:1000/home');
            
        }else {
            res.status(400).json({message: "Incorrect username or password"})
        }
       
    } catch (error) {
        res.status(400).json({message: "There is an error"})
    }
    
})
routes.get("/home", (req, res)=>{
    res.render("homeuser")
})
routes.get("/register", (req, res)=>{
    res.render("register")
    
    
})
routes.post("/register", async (req, res)=>{
    try {
        const {user, pass} = req.body
        res.json({message: "Registered Successfully!"})
        await createaccount(user, pass)
            
    } catch (error) {
        res.status(500).json({message: "Unsuccessful!"})
    }
})

module.exports = routes