const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    image: Buffer,
    name: {
        type: String,
        required: true,  
    },
    price: {
        type: Number,
        required: true, 
    },
    discount: {
        type: Number,
        default: 0,
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

module.exports = mongoose.model("Product", ProductSchema);
