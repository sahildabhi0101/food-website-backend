const express=require('express');
const {signup , signin , signout , forgotPassword, resetPassword,}=require('../controller/auth')
const {userbyid}=require('../controller/user')
const {usersignupvalidator , passwordResetValidator } = require('../validator');

const router = express.Router();

router.post('/signup', usersignupvalidator , signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.put('/forgot-password', forgotPassword);
router.put('/reset-password', passwordResetValidator, resetPassword);

// any route containing :
//userid ,our app will first execute userbyid()  
router.param("userId",userbyid);



module.exports =router;