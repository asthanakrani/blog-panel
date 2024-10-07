const signUpModel = require('../models/sing up _models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUpController = async (req , res) => {

    console.log("req", req.body);
    if(req.body.password === req.body.con_password){

        bcrypt.hash(req.body.password, saltRounds,async (err, hashPassword) => {
            console.log("hash",hashPassword);

            const data =  {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            }
            try{
                let todo = new signUpModel(data);
                console.log("db",todo);
                
                await todo.save();
                res.redirect('/login')
            }catch(err){
                console.log("err",err);
                res.redirect('/login')
            }
        });
    }else{
        res.redirect('/')
    }
    
}
const signUpform = (req,res)=>{
    res.render('pages/samples/register')
}

module.exports = {signUpController,signUpform}


