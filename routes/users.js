const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route    POST /api/users
//@desc     Register user
//@access   Public

router.post('/',
            [ check('name','Please enter name').not().isEmpty(),
              check('email','Please enter a valid Email ID').isEmail(),
              check('password','Please enter password with minimum of 6 characters').isLength({min:6})],
              async (req, res) => {
  
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({Error:errors.array()});
  }
  const {name, email, password} = req.body;

  try{
    let user = await User.findOne({email});
    console.log("user email");
    console.log(user);
    if(user){
      return res.status(400).json({msg:'User already exists'});
    }
    user =new User({name,email,password});

    //hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    
    await user.save();

    const payload = {
      user : {
                id:user.id
              }
    };

    jwt.sign( payload,
              config.get('jwtsecret'),
              {expiresIn:360000},
              (err,token)=>{
                if(err) throw err;
                res.json({token})
              });


    //res.send('user saved');
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('server error');
  }
  
 
});

module.exports = router;
