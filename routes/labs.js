const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const Lab = require('../models/lab');

router.post('/dashboard',(req,res,next) => {
    let newLab = new Lab({
        labname :req.body.labname,
        amount :req.body.amount,
        
    });


        Lab.addLab(newLab,(err,lab) => {
            if(err){
                res.json({success:false,msg:'Failed to insert new lab'});
            } else {
                res.json({success:true,msg:'New lab added Successfully'});
            }
        });
   });
/*
router.post('/authentication',(req,res ,next) => {
    
     
    
    Lab.getLabByLabname(labname,(err,user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success:false,msg:'Lab not found'});
        }
        
        
    });
});*/







module.exports = router;