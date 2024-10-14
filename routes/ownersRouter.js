const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Owner_model = require('../models/Ownermodel');

// Admin create products page (GET)
router.get("/admin", function(req, res) {
    let success = req.flash("success");
    let error = req.flash("error");
    res.render('createproducts', { success, error });
});

// Admin login or create product (POST)
router.post('/create', async (req, res) => {
    let { email, password } = req.body;

    try {
        let owner = await Owner_model.findOne({email});
   
        if (owner)
             {
            
                    bcrypt.compare(password,owner.password,(err,result)=>
                    {
                        if(result)
                        {
                            req.flash('success', 'Welcome, Admin!');
                            return res.redirect('/admin',{success}); 

                        }
                        else {
           
                            req.flash('error', 'Admin not found. Please check your credentials.');
                            return res.redirect('/admin_login'); 
                        }
                    })
            }
            
        else {
           
            req.flash('error', 'Admin not found. Please check your credentials.');
            return res.redirect('/admin_login'); 
        }

    } catch (error) {
        
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/admin_login'); 
    }
});

module.exports = router;
