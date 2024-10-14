const jwt = require('jsonwebtoken');
const userModel = require('../models/Usermodel');

module.exports = async (req,res,next)=>
{
    if(!req.cookies.token){
        req.flash("error" ,"you need to login first");
        return res.redirect('/');
    }

    try{

        let deocded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        
        let user = await userModel.findOne({email:deocded.email}).select("-password");

        req.user = user;

        next();

    } catch(err)
    {
        req.flash("error","something went wrong");
        res.redirect("/");
    }
}