const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:String,
    password: String,
    category:{
        type: Array,
        default: [],
    }
});

module.exports= mongoose.model('admin', adminSchema);



