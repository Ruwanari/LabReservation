const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const ReservationSchema = mongoose.Schema ({
    labname:{
        type:String
    },
    date:{
        type:String
    },
   timeslot:{
       type:String
   }
});

const Reservation = module.exports = mongoose.model('Reservation',ReservationSchema);

module.exports.getReservationById = function(id,callback){
    
    Reservation.findById(id,callback);
}





module.exports.addReservation = function(newReservation,callback) {
    
            newReservation.save(callback);    
        
    
}


