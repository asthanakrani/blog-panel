const loginModel = require('../models/sing up _models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const logIn = (req,res)=> {
    console.log("login con");
    
    res.render('pages/samples/login');
}
const logInController = async (req,res)=>{
    console.log("log in done ..");
    
    res.redirect('/')
    
}
const logout = (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
}
module.exports = {logIn,logInController,logout};