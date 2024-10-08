const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');
const isAuth = require('../authentication/isAuth.js')

const upload = require('../config/multerconfig.js')
const signUp = require('../controller/singup_controller.js');
const logIn = require('../controller/login_controller.js')
const passport = require('../config/passport.js')
const changePassword = require('../controller/change_password_controller.js')
const blog = require('../controller/blog_controller.js');
const multer = require('multer');
router.get('/' ,isAuth, controller.defaultController);
router.get('/myProfile' ,isAuth, controller.profileController);
router.get('/signUp',signUp.signUpform)
router.post('/signUpCon',signUp.signUpController)
router.get('/login',logIn.logIn);
router.get('/logout',logIn.logout);
router.post('/addBlogData',upload.single('blog_img'),blog.addBlogData);
router.get('/addBlog',isAuth,blog.addBlog)
router.get('/viewBlog',isAuth,blog.viewBlog);
router.get('/delete/:id',blog.deleteBlog)
router.get('/edit/:id',isAuth,blog.editBlog)
router.post('/editBlog/:id',upload.single('blog_img'),blog.updateBlog)
router.get('/myBlog',blog.myBlog)
router.post('/logInController', passport.authenticate('local', { failureRedirect: '/login' }),logIn.logInController)
router.get('/allBlog', isAuth, blog.allBlog);
// password
router.get('/changePassword',isAuth,changePassword.changePassword)
router.post('/ChangepassController',changePassword.ChangepassController)
router.get('/forgetpassword',changePassword.forgetpassword);
router.post('/forgotPasswordController',changePassword.forgotPasswordController);
router.get('/otpcheak/:id',changePassword.otpcheak);
router.post('/resetPass/:id',changePassword.resetPass);
router.get('/resetPass/:id',changePassword.resetPass);
router.post('/resetPassContoller/:id',changePassword.resetPassContoller);
module.exports = router;