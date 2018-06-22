const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const Reservation = require('../models/reservation');

router.post('/reservation',(req,res,next) => {
    let newReservation = new Reservation({
        labname:req.body.labname,
        date:req.body.date,
        timeslot:req.body.timeslot
        
    });


        Reservation.addReservation(newReservation,(err,reservation) => {
            if(err){
                res.json({success:false,msg:'Failed to reserve timeslot'});
            } else {
                res.json({success:true,msg:'Reservation added successfully'});
            }
        });
   });

   router.get('/viewreservation', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({reservation: req.reservation});
  });

  


module.exports = router;