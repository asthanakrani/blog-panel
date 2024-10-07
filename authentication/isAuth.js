const isAuth = (req,res,next)=>{
    console.log("isAuth",req.isAuthenticated());

    if(req.isAuthenticated()){
        console.log("is auth next");
        
        next();
    }else{
        console.log("is auth not done");
        
        res.redirect('/login');
    }
}
module.exports = isAuth;