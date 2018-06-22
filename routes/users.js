const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const User = require('../models/user');

router.post('/register',(req,res,next) => {
    let newUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });


        User.addUser(newUser,(err,user) => {
            if(err){
                res.json({success:false,msg:'Failed to register User'});
            } else {
                res.json({success:true,msg:'User Registered Succuessfully'});
            }
        });
   });

router.post('/authentication',(req,res ,next) => {
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
     
    
    User.getUserByEmail(email,(err,user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success:false,msg:'User not found'});
        }
        
        User.comparePassword(password,user.password,(err,isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user},config.secret, {
                    expiresIn:604800 //1 week
                });
                
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user: {
                        id:user._id,
                        firstname:user.firstname,
                        lastname:user.lastname,
                        username:user.username,
                        email:user.email    
                    }
                });
            
            } else {
                 return res.json({success:false,msg:'Wrong password'});
            }
        });
    });
});



router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });



module.exports = router;