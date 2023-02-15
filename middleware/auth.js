const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../model/User');

module.exports = function(req,res,next){

  const token = req.header('x-auth-token');

//  console.log("req.header-server side",req.header('x-auth-token'));

  if(!token){
  //  console.log("req.header-server side",req.header('x-auth-token'));

    return res.status(401).json({msg:"No token,Invalid credentials"});
  }
  try {
    const decoded = jwt.verify(token,config.get('jwtsecret'));
    req.user = decoded.user;

    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({msg:"Token is not valid...Invalid credentials"});
  }


}