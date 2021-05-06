const _ = require('lodash');
const User = require('../models/user');
const formidable = require('formidable');
const fs = require('fs');

exports.userbyid = (req, res , next ,id) =>
{
    User.findById(id).exec((err,user) =>
    {
        if(err || !user)
        {   return res.status(400).json({
                error: "user not found"})
        }
        // add profile object in req with user info 
        req.profile = user 
        next()
    });
};

exports.hasauthorization = (req,res,next) =>
{
    const authorised = 
    req.profile && req.auth && req.profile._id === req.auth._id    
    if(!authorised) 
    {
        return res.status(403).json({
            error: "User is not authorised to perform this action"
        });
    }

}

exports.alluser = (req,res) =>
{
    User.find((err, users) =>
    {
    if(err)    return res.status(400).json({error: err});  
    res.json(users);
    }).select("name email updated created");
    // select no use all field mathi only selected mahiti j select karva mate
};

exports.getuser = (req,res) =>
{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile);
}

exports.updateuser = (req,res,next) =>
{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req , ( err , fields , files ) =>
    { 
        if(err)
            return res.status(400).json({error: "photo could not be uploaded"})
        
        let user = req.profile    
        user = _.extend(user,fields)
        user.updated = Date.now() 
            
        if(files.photo)
        {
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType=files.photo.type
        }
        user.save( (err,result) => 
                {
                    if(err)
                        return res.status(400).json({error: err});
                    user.hashed_password = undefined;
                    user.salt = undefined;
                    res.json(user);
                });
    });
};

exports.userphoto = (req,res,next)=>
{
    if(req.profile.photo.data)
    {
        res.set("Content-Type" , req.profile.photo.contentType);
        return res.send(req.profile.photo.data);
    }
    next();
}

exports.deleteuser = (req,res,next) =>
{
    let user = req.profile;
    user.remove( (err , user) => 
    {
        if(err)
            return res.status(400).json({error:err});
        
        res.json({message: "user delete successfully "})  
    })
}