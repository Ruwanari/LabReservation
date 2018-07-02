const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const LabSchema = mongoose.Schema ({
    labname:{
        type:String
    },
    amount:{
        type:Number
    }
});

const Lab = module.exports = mongoose.model('Lab',LabSchema);

module.exports.getLabById = function(id,callback){
    
    Lab.findById(id,callback);
}

module.exports.getLabByLabname = function(labname,callback){
    const query = {labname:labname}
    Lab.findOne(query,callback);
}



module.exports.addLab = function(newLab,callback) {
    
            newLab.save(callback);    
        
    
}

module.exports.getAllLabs = function(callback){
    Lab.find({},callback);
}

module.exports.deleteLab = function(id,callback){
    const query = {_id:id}
    Lab.remove(query,callback);
}


