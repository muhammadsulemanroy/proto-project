const express = require('express');
const Worker = require('../models/supportModel');
const nodemailer = require('nodemailer');

exports.getAllWorkers = async (req,res,next)=>{
try{
    const pendingWorkers = await Worker.find({status:'pending'}).select('_id firstName lastName email hourlyRate status')
   res.status(200).json(pendingWorkers);
}catch(err){
  res.status(400).json({ 
    status:'failed',
    message:err
  })
}
next()
}

exports.updateStatus = async (req,res)=>{
  try{
   const workerStatus = await Worker.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  });
   res.status(200).json({
    status:'Updated',
    workerStatus
   })
  }catch(err){
    res.status(400).json({ 
      status:'failed',
      message:err
    })
  }
  }

exports.mail = async (req,res)=> {
try{
  const sendingMail = await Worker.findById(req.params.id);
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'adah.klein97@ethereal.email',
        pass: 'BpxB5agwQ5DxrWcMmF'
    }
});

  const info = await transporter.sendMail({
    from: 'adah.klein97@ethereal.email', 
    to: sendingMail, 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>", 
  });


 



}catch(err){

}
}
