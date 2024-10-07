const model = require('../models/sing up _models');

const defaultController = async(req , res)=>{
    
    res.render('index',{data :req.user})
}
const profileController = async(req,res)=>{
    console.log("profile page",{data: req.user});

    res.render('pages/samples/myProfile',{data: req.user})
}
module.exports={defaultController , profileController}