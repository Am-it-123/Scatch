const express = require('express');
const router = express.Router();

const productModel = require('../models/Product');

const Usermodel = require('../models/Usermodel');
const  Owner = require('../models/Ownermodel');

const isloggedin = require('../middlewares/isLoggedIn');

router.get('/',(req,res)=>
{
    let error = req.flash("error");
    res.render("index",{error ,loggedin : false});
});


router.get("/shop",isloggedin, async function(req,res)
{
    let products = await productModel.find();
    let success = req.flash("success")
    res.render("shop",{products,success});
})
router.get("/cart",isloggedin, async function(req,res)
{
     let user = await Usermodel.findOne({email: req.user.email})
     .populate("cart");
     res.render("cart",{user});
     

})

router.get("/admin_login",(req,res)=>
{
    let success = req.flash('success');
    let error = req.flash('error');
    
     res.render('owner-login',{success,error});
})


router.get("/addtocart/:productid",isloggedin, async function(req,res)
{
    
    let user = await Usermodel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);

    await user.save();
    req.flash("success","Added to cart");
    res.redirect('/shop');

});
module.exports = router;