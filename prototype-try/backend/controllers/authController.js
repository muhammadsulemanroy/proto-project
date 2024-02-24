const jwt = require('jsonwebtoken');
const Worker = require('../models/supportModel');

const signToken = id => jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN
}); 

exports.signup = async (req,res,next) => {
 try{
const worker = await Worker.create(req.body);   
const token = signToken(worker._id);
 res.status(200).json({
    result:'Worker is Pending for Approval',
    token,
    worker
 })
}catch(err){
    res.status(400).json({
        result:'failed',
        message: 'user already registered'
       
    })
}
next();
}


exports.login = async (req,res,next) => {
try{
const{email,password} = req.body;


if (!email || !password) {
    return res.status(400).json({ status: 'failed', message: 'Email or password is missing' });
  }

const worker = await Worker.findOne({email}).select('+password +status');
if (!worker || !(await worker.comparePassword(password, worker.password))) {
    return res.status(401).json({ status: 'failed', message: 'Incorrect email and password' });
  }

  if (worker.status !== 'approved') {
    return res.status(401).json({ status: 'failed', message: 'Account not approved' });
  }
const token = signToken(worker._id);
res.status(200).json({
  result:'sucessfully logged in',
  token
})
}catch(err){
res.status(400).json({
    status:'failed',
    message:err
})
}
}