const bcrypt =require('bcrypt');
const userModal = require('../models/sing up _models');
let myOtp = null;
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 465,
    secure:true,
    service:'Gmail',
    auth:{
        user:"nakraniastha0801@gmail.com",
        pass: "ouvz kqoa pmbv bodm",
    },
});
const changePassword = (req,res)=>{
    res.render('pages/samples/chang-password')
}
const ChangepassController=async(req,res)=>{
    console.log("change password ");
    const{password}=req.user;
    const{cur_password,new_password,conform_password}=req.body;
    bcrypt.compare(cur_password,password,(err,result)=>{
        console.log("err result",err,result);
        if(result){
            console.log("password match");
            if(new_password == conform_password){
                bcrypt.hash(new_password,10,async(err,hashPassword)=>{
                    console.log("hash",hashPassword);
                    const updataPass=await userModal.updateOne({_id:req.user._id},{password:hashPassword});
                    console.log("updated pass",updataPass);  
                })
                res.redirect('/')
            }else{
                console.log("new &  conform not match");
                req.redirect('/changPassword')
                
            }
        }else{
            console.log("password not match"); 
            res.redirect('pages/samples/chang-password')
        }     
    })
}
const forgetpassword  =(req,res)=>{
    console.log("forgot Password");
    res.render('pages/samples/forgetpassword')
}
const forgotPasswordController = async (req, res) => {
    try {
        console.log("forgot Password Controller");
        const { email } = req.body;
        const user = await userModal.findOne({ email: email });

        console.log("user", user, email);
        if (user) {
            console.log("user found");
            // let link =`http://localhost:3005/resetPass/${user._id}`;
            // console.log("link>>>",link);
            
            res.redirect(`/otpcheak/${user._id}`);
            let mailopt ={
                from:"nakraniastha0801@gmail.com",
                to: user.email,
                subject:"RESET password",
                text:`Your Otp: ${myOtp}`,
            };
            transporter.sendMail(mailopt,(err,info)=>{
                if(err){
                    console.log('err',err);
                    
                }else{
                    console.log('email sent',info);
                    
                }
            })
        } else {
            console.log("user not found");
            res.redirect('/signUp');
        }
    } catch (error) {
        console.error("Error in forgotPasswordController:", error);
        res.status(500).send("Internal server error");
    }
};
const otpcheak = (req,res)=>{
    console.log("id",req.params.id);
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets : false, specialChars: false });
    myOtp = otp;
    console.log("OTP",myOtp);
    res.render('pages/samples/otpcheak',{id :req.params.id});
}
const resetPass =  (req,res)=>{
    console.log("confirm otp",req.params.id);
    res.render('pages/samples/resetPass',{id:req.params.id});
}
const resetPassContoller =(req,res) => {
    console.log("reset pass ontoller",req.params.id);
    let id = req.params.id;
    const{new_password,conform_password}=req.body;
    if(new_password == conform_password){
        bcrypt.hash(new_password,10,async(err,hashPassword)=>{
            console.log("hash",hashPassword);
            const updataPass=await userModal.updateOne({_id:id},{password:hashPassword});
            console.log("updated pass",updataPass);  
        })
        res.redirect('/')
    }else{
        console.log("new &  conform not match");
        req.redirect('/resetPass')
        
    }
    res.redirect('/')
    
}
module.exports={changePassword,ChangepassController,forgetpassword,forgotPasswordController,otpcheak,resetPass,resetPassContoller};