const mongoose  = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const workerSchema = new mongoose.Schema({
   
    firstName:{
       type:String,
       required:[true,'please Enter Your FirstName'],
       unique:true
    },
    lastName:{
        type:String,
        required:[true,'please Enter Your LastName'],
        unique:true
     },
     mobileNo:{
        type:Number,
        required:[true,'please Enter Your Mobile number']
     
     },
     email:{
        type:String,
        required:[true,'please Enter Your Email'],
        unique:true,
        validate:[validator.isEmail,'please Enter Valid Email'],
        lowercase:true
     },
     password:{
       type:String,
       required:[true,'Enter Your password'],
       select:false
     },
     qualificationDetails:{
      type:String,
      required:[true,'please Enter  Your Qualification Detail']
     },
     picture:{
        type:String,
        required:[true,'please Enter Your Picture']
     },
   
     experience:{
        type:String,
        required:[true,'please Enter  Your Experience']
     },

     bio:{
        type:String,
        required:[true,'please Enter  Your Bio']
     },

     hourlyRate:{
        type:Number,
        required:[true,'please Enter Your Horly Rate']
     },
     status:{
        type:String,
        default:'pending',
        select:false
     }

})

workerSchema.pre('save',async function(next){
  if(!this.isModified('password')){
   return next();
  }
  this.password = await bcrypt.hash(this.password,12);

})

workerSchema.methods.comparePassword = async function(candidatePassword,userPassword){
return await bcrypt.compare(candidatePassword,userPassword);
}

const Worker = mongoose.model('Worker',workerSchema);

module.exports = Worker;