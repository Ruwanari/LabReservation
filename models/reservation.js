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

module.exports.getAllReservations = function(callback){
    Reservation.find({},callback);
}

module.exports.checkConflict = function(callback){
    Reservation.find({},callback);
}

module.exports.deleteReservation = function(id,callback){
    const query = {_id:id}
    Reservation.remove(query,callback);
}


module.exports.editReservation = function(id,eReservation,callback) {
    const query = {_id:id}
    eReservation.update(query);
}

module.exports.getOneReservation = function(id,callback){
    const query = {_id:id}
    Reservation.findOne(query,callback);
}