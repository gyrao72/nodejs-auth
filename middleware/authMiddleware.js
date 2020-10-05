// jshint esversion:8

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    //check json web token exists and is verified
    if(token){
        jwt.verify(token,"Gajendar",(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
};

//check user
const checkUser = (req,res,next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"Gajendar",async (err,decodedToken)=>{
            if(err){
                res.locals.user = null ; 
                next();
            }
            else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; 
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth , checkUser };
