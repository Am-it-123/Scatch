const userModel = require('../models/Usermodel');
const owner = require('../models/Ownermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');

const {GenerateToken} = require('../utlis/GenerateToken');
 

 module.exports.registerUser = async (req,res)=>
    {
        try{
            let {email,password,fullname} = req.body;

            let user = await userModel.findOne({email:email});

            if(user)
            {
                req.flash("error","HIII,ther You are already resisterd");
                return res.redirect('/');
                
            }
            bcrypt.genSalt(10,(err,salt) =>
            {
                bcrypt.hash(password,salt,async (err,hash)=>
               {
                    if(err) return res.send(err.message);
                    else 
                        {
                            let user = await userModel.create
                            ({
                                email,
                                password : hash,
                                fullname,
                            });
                                
                                let token =  GenerateToken(user);
                                res.cookie("token",token);
                                req.flash("error","User Created");
                                res.redirect('/');               
                                
                        }
        
                 })
    
            })    
    
            } catch(err)
                {
                    console.log(err.message);
                }
        
}





module.exports.loginUser = async (req,res)=>
{
    let {email,password} = req.body;

    let user =await  userModel.findOne({email});

    if(!user)
    {
        req.flash("error","Email or password incorrect");
        res.redirect('/');
    }
    else{
          
           bcrypt.compare(password,user.password,(err,result) =>
        {
            if(result)
            {
                let token = GenerateToken(user);               
                res.cookie("token",token);
                // res.send("You can login");
                res.redirect('/shop');
            }
            else
            {
                req.flash("error", "email or password incorrect");
                res.redirect('/');
            }
        })
    }
}
module.exports.logoutUser = async (req,res)=>
{
    res.cookie("token","");
    res.redirect('/');
}