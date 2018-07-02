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

  router.get('/allreservations',(req,res,next)=>{
    Reservation.getAllReservations((err,reservationlist)=>{
        if(err){
            res.json({success:false,msg:"Something went wrong"});
        }else{
             res.json({success:true,reservationlist:reservationlist});
         }
        
    });
})

router.get('/checkconflict',(req,res,next)=>{
    Reservation.checkConflict((reservation)=>{
        if((labname === this.labname) && ( timeslot === this.timeslot)&&(date === this.date)){
            res.json({success:false,msg:"res conflict"});
        }else{
             res.json({success:true,reservationlist:reservationlist});
         }
        
    });
})

router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
 Reservation.deleteReservation(id,(err,reservation)=>{
     if(err){
         res.json({success:false,msg:"Something went wrong"})
     }else{
          res.json({success:true,msg:"Deleted successfully"});
      }
     
 });
});

router.get('/getreservation/:id',(req,res,next) => {
    const id = req.params.id;
    Reservation.getOneReservation(id,(err,reservation) => {
     if(err) {
         res.json({success:false,msg:'Failed to load that specific lab'});
     } else  {
         res.json({success:true,reservation:reservation});
     }
    });
    
});

router.post('/editreservation/:id',(req,res,next) => {
    const id = req.params.id;  
    
    let newReservation = new Reservation ({
        
        labname:req.body.labname,   
        date:req.body.date,
        timeslot:req.body.timeslot
        
    }); 

    Reservation.deleteReservation(id,(err,lab) => {
        if(err){
            console.log('error');
        } else {
            console.log('success');
        }
    });


    
    Reservation.addReservation(newReservation ,(err,user) => {
        console.log(newReservation);
            if(err) {   
                res.json({success:false,msg:'Failed to edit reservation'});
            } else {
                res.json({success:true,msg:'Reservation edited successfully'});
            }
        });


        
    
   });


module.exports = router;