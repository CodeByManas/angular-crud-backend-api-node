const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    contact : {
        type: Number,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    maritalstatus: {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required:true,
    },
});
module.exports.userData = mongoose.model('userData', dataSchema);

// For login credentials 
const loginData = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
    }
});

module.exports.loginCredential = mongoose.model('loginCredential', loginData);

