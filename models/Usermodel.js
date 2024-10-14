const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        fullname : String,
        email : String,       
        password:String,

        cart: [{
            type: mongoose.Schema.Types.ObjectId,
             ref: "Product",
        }],

        Isadmin : Boolean,
        orders:
        {
            type:Array,
            default:[],
        },

        contact:Number,
        
        picture:String,


    }
);

module.exports = mongoose.model("User",UserSchema);