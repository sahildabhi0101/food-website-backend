const express=require('express');
const {userbyid , alluser, getuser , updateuser, deleteuser , userphoto}=require('../controller/user')
const {requiresignin}=require('../controller/auth');


const router = express.Router();

router.get('/users', alluser);
router.get('/users/:userId',requiresignin, getuser);
router.put('/users/:userId',requiresignin, updateuser);
router.delete('/users/:userId',requiresignin, deleteuser);
router.get("/users/photo/:userId" , userphoto)

// any route containing :
//userid ,our app will first execute userbyid()  
router.param("userId",userbyid);

module.exports =router;

