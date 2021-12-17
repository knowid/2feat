const mongoose = require('mongoose');

const sneakerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    mainImage:{
        type: String,
        required: true,
    },
    otherImages: Array,
    category:{
        type:String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
    },
    tags:{
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model('sneaker', sneakerSchema);

