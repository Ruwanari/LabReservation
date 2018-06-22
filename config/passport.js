const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Lab = require('../models/lab');
const Reservation = require('../models/reservation');
const config = require('../config/database');


module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts,(jwt_payload,done) => {
        console.log(jwt_payload);   
        User.getUserById(jwt_payload.data._id,(err,user) => {
            if(err){
                return done(err,false);
            } 
            if(user) {
                return done(null,user);
            } else {
                return done(null,false);
            }
        });

        Lab.getLabById(jwt_payload.data._id,(err,lab) => {
            if(err){
                return done(err,false);
            } 
            if(lab) {
                return done(null,lab);
            } else {
                return done(null,false);
            }
        });
        Reservation.getReservationById(jwt_payload.data._id,(err,reservation) => {
            if(err){
                return done(err,false);
            } 
            if(reservation) {
                return done(null,reservation);
            } else {
                return done(null,false);
            }
        });

    }));
}