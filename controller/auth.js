const jwt =require('jsonwebtoken');
require('dotenv').config();
const expressjwt = require('express-jwt');
const User = require('../models/user');

const _ = require("lodash");
const { sendEmail } = require("../helpers");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = async(req,res) => 
{
    const userexists = await User.findOne({email: req.body.email });
    if(userexists)  return res.status(403).json({
                    error: "Email is already taken signup with different email"})
    const user = await new User(req.body) 
    await user.save()
    res.status(200).json({message : "signup successful! please login."});

};

exports.signin = (req,res) =>
{
    // find the user based on email
    const {email, password} = req.body
    // const j = User.findOne ( {email: 'sahil11@gmail.com' }  )
    // console.log(j);
    User.findOne(   {email},
         (err, user) => {
             //console.log(user);
             if(err || !user)
             {
                return res.status(401).json(
                    {
                        error:"User with this email is doesn't exist . please sign-in"
                    })
                }
            // if user is found then email and password must match
            // create authenticate method in model and use here
            if(!user.authenticate(password))
            {
                return res.status(401).json(
                    {
                        error:"email and password are not matching"
                    })
            }
    //generate a token with user id and secret

        const token = jwt.sign(
        {_id: user._id}, process.env.JWT_SECRET );
        
    // persist the token as 't' in cookie with expiry date

        res.cookie("t",token,{expire: new Date() + 9999})
    //return response with user and give to front end client
        const {_id , name , email} = user
        return res.json({token , user: {_id , email , name} })
    }
    )
};

exports.signout = (req,res) =>
{
    res.clearCookie("t");
    return res.json({"message" : "signout successful"});

};
//signin ma restrication mukva mate che
exports.requiresignin = expressjwt({
    // if the token is valid express-jwt appends the verified user id
    //it is an auth key
    secret: process.env.JWT_SECRET, 
    userProperty: 'auth'
});

exports.forgotPassword = (req, res) => {
    if (!req.body) return res.status(400).json({ message: 'No request body' });
    if (!req.body.email) return res.status(400).json({ message: 'No Email in request body' });

    console.log('forgot password finding user with that email');
    const { email } = req.body;
    console.log('signin req.body', email);
    // find the user based on email
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status('401').json({
                error: 'User with that email does not exist!'
            });

        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id, iss: process.env.APP_NAME }, process.env.JWT_SECRET);

        // email data
        const emailData = {
            from: 'noreply@node-react.com',
            to: email,
            subject: 'Password Reset Instructions',
            text: `Please use the following link to reset your password: ${
                process.env.CLIENT_URL
            }/reset-password/${token}`,
            html: `<p>Please use the following link to reset your password:</p> <p>${
                process.env.CLIENT_URL
            }/reset-password/${token}</p>`
        };

        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ message: err });
            } else {
                sendEmail(emailData);
                return res.status(200).json({
                    message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
                });
            }
        });
    });
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    User.findOne({ resetPasswordLink }, (err, user) => {
        // if err or no user
        if (err || !user)
            return res.status('401').json({
                error: 'Invalid Link!'
            });

        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ''
        };

        user = _.extend(user, updatedFields);
        user.updated = Date.now();

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Great! Now you can login with your new password.`
            });
        });
    });
};
