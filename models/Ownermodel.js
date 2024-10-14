const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    }],
    picture: String,
    gstin: String
});

module.exports = mongoose.model('Owner', OwnerSchema);